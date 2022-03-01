import BigNumber from 'bignumber.js';
import flatten from 'lodash/flatten';
import { Contract, EventData, Filter } from 'web3-eth-contract';

import {
  IWeb3SendResult,
  Web3KeyProvider,
  Web3KeyReadProvider,
  BlockchainNetworkId,
} from 'provider';

import { configFromEnv } from 'modules/api/config';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { ETH_SCALE_FACTOR, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { convertNumberToHex } from 'modules/common/utils/numbers/converters';
import { getAPY } from 'modules/stake/api/getAPY';
import {
  getTxEventsHistoryGroup,
  TTxEventsHistoryGroupData,
} from 'modules/stake/api/getTxEventsHistoryGroup';

import {
  FANTOM_PROVIDER_ID,
  FANTOM_PROVIDER_READ_ID,
  POOL_START_BLOCK,
  MAX_BLOCK_RANGE,
} from '../const';

import AFTMbAbi from './contracts/aFTMb.json';
import FantomPoolAbi from './contracts/FantomPool.json';

export enum EFantomPoolEvents {
  TokensBurned = 'TokensBurned',
  Withdrawn = 'Withdrawn',
  StakeReceived = 'StakeReceived',
}

interface IFantomSDKProviders {
  writeProvider: Web3KeyProvider;
  readProvider: Web3KeyReadProvider;
}

interface IGetPastEvents {
  provider: Web3KeyProvider | Web3KeyReadProvider;
  contract: Contract;
  eventName: string;
  startBlock: number;
  rangeStep: number;
  filter?: Filter;
}

export class FantomSDK {
  private static instance?: FantomSDK;

  private readonly writeProvider: Web3KeyProvider;

  private readonly readProvider: Web3KeyReadProvider;

  private currentAccount: string;

  private constructor({ readProvider, writeProvider }: IFantomSDKProviders) {
    FantomSDK.instance = this;

    this.readProvider = readProvider;
    this.writeProvider = writeProvider;
    this.currentAccount = this.writeProvider.currentAccount;
  }

  public static async getInstance(): Promise<FantomSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();
    const [writeProvider, readProvider] = await Promise.all([
      providerManager.getProvider(FANTOM_PROVIDER_ID),
      providerManager.getReadProvider(FANTOM_PROVIDER_READ_ID),
    ]);

    const addrHasNotBeenUpdated =
      FantomSDK.instance?.currentAccount === writeProvider.currentAccount;
    const hasNewProvider =
      FantomSDK.instance?.writeProvider === writeProvider &&
      FantomSDK.instance?.readProvider === readProvider;

    if (FantomSDK.instance && addrHasNotBeenUpdated && hasNewProvider) {
      return FantomSDK.instance;
    }

    const instance = new FantomSDK({ writeProvider, readProvider });
    const isFmtNetwork = await instance.isFmtNetwork(writeProvider);

    if (isFmtNetwork && !writeProvider.isConnected()) {
      await writeProvider.connect();
    }

    return instance;
  }

  private async getProvider(
    isForceRead = false,
  ): Promise<Web3KeyProvider | Web3KeyReadProvider> {
    if (isForceRead) {
      return this.readProvider;
    }

    const isFmtChain = await this.isFmtNetwork(this.writeProvider);

    if (isFmtChain && !this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    if (isFmtChain) {
      return this.writeProvider;
    }

    return this.readProvider;
  }

  private async isFmtNetwork(provider: Web3KeyProvider): Promise<boolean> {
    const web3 = provider.getWeb3();
    const chainId = await web3.eth.getChainId();

    return [
      BlockchainNetworkId.fantom,
      BlockchainNetworkId.fantomTestnet,
    ].includes(chainId);
  }

  private convertFromWei(amount: string): BigNumber {
    return new BigNumber(this.readProvider.getWeb3().utils.fromWei(amount));
  }

  private getFantomPoolContract(
    provider: Web3KeyProvider | Web3KeyReadProvider,
  ): Contract {
    const { fantomConfig } = configFromEnv();

    return provider.createContract(FantomPoolAbi, fantomConfig.fantomPool);
  }

  private getAftmbTokenContract(
    provider: Web3KeyProvider | Web3KeyReadProvider,
  ): Contract {
    const { fantomConfig } = configFromEnv();

    return provider.createContract(AFTMbAbi, fantomConfig.aftmbToken);
  }

  public async getTxHistory(): Promise<{
    stakeEvents: TTxEventsHistoryGroupData;
    pendingEvents: TTxEventsHistoryGroupData;
    withdrawnEvents: TTxEventsHistoryGroupData;
    totalPending: BigNumber;
  }> {
    const provider = await this.getProvider();
    const fantomPoolContract = this.getFantomPoolContract(provider);
    const web3 = provider.getWeb3();

    const firstWrId: string = await fantomPoolContract.methods
      .firstWrId()
      .call();

    const [stakeRawEvents, unstakeRawEvents, withdrawnRawEvents] =
      await Promise.all([
        // event StakeReceived is emitted once transaction is successfull
        this.getPastEvents({
          provider,
          contract: fantomPoolContract,
          startBlock: POOL_START_BLOCK,
          rangeStep: MAX_BLOCK_RANGE,
          eventName: EFantomPoolEvents.StakeReceived,
          filter: {
            staker: this.currentAccount,
          },
        }),
        // To gen pending withdrawal requests, one can get all TokensBurned events for given staker
        this.getPastEvents({
          provider,
          contract: fantomPoolContract,
          startBlock: POOL_START_BLOCK,
          rangeStep: MAX_BLOCK_RANGE,
          eventName: EFantomPoolEvents.TokensBurned,
          filter: {
            staker: this.currentAccount,
          },
        }),
        this.getPastEvents({
          provider,
          contract: fantomPoolContract,
          startBlock: POOL_START_BLOCK,
          rangeStep: MAX_BLOCK_RANGE,
          eventName: EFantomPoolEvents.Withdrawn,
          filter: {
            staker: this.currentAccount,
          },
        }),
      ]);

    const pendingRawEvents: EventData[] = [];

    unstakeRawEvents.forEach(current => {
      // Events with wrId >= firstWrId are pending
      if (+current.returnValues.wrId >= +firstWrId) {
        pendingRawEvents.push(current);
      }
    });

    const [stakeEvents, withdrawnEvents, pendingEvents] = await Promise.all(
      [stakeRawEvents, withdrawnRawEvents, pendingRawEvents].map(rawEvents =>
        getTxEventsHistoryGroup({ rawEvents, web3 }),
      ),
    );

    const totalPending = pendingEvents.reduce(
      (acc, { txAmount }) => acc.plus(txAmount),
      ZERO,
    );

    return {
      stakeEvents,
      pendingEvents,
      withdrawnEvents,
      totalPending,
    };
  }

  private async getPastEvents({
    provider,
    contract,
    eventName,
    startBlock,
    rangeStep,
    filter,
  }: IGetPastEvents): Promise<EventData[]> {
    const web3 = provider.getWeb3();
    const latestBlockNumber = await web3.eth.getBlockNumber();

    const eventsPromises: Promise<EventData[]>[] = [];

    for (let i = startBlock; i < latestBlockNumber; i += rangeStep) {
      const fromBlock = i;
      const toBlock = fromBlock + rangeStep;

      eventsPromises.push(
        contract.getPastEvents(eventName, { fromBlock, toBlock, filter }),
      );
    }

    const pastEvents = await Promise.all(eventsPromises);

    return flatten(pastEvents);
  }

  public async stake(amount: BigNumber): Promise<IWeb3SendResult> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);
    const fantomPoolContract = this.getFantomPoolContract(this.writeProvider);

    return fantomPoolContract.methods.stake().send({
      from: this.currentAccount,
      value: hexAmount,
    });
  }

  public async unstake(amount: BigNumber): Promise<IWeb3SendResult> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);
    const fantomPoolContract = this.getFantomPoolContract(this.writeProvider);

    return fantomPoolContract.methods.burn(hexAmount).send({
      from: this.currentAccount,
    });
  }

  public async getBurnFee(amount: BigNumber): Promise<BigNumber> {
    const provider = await this.getProvider();
    const fantomPoolContract = this.getFantomPoolContract(provider);

    const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);
    const burnFee = await fantomPoolContract.methods
      .getBurnFee(hexAmount)
      .call();

    return this.convertFromWei(burnFee);
  }

  public async getMinimumStake(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const fantomPoolContract = this.getFantomPoolContract(provider);

    const minStake = await fantomPoolContract.methods.getMinimumStake().call();

    return this.convertFromWei(minStake);
  }

  public async addAftmbToWallet(): Promise<void> {
    const { fantomConfig } = configFromEnv();

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    await this.writeProvider.addTokenToWallet({
      address: fantomConfig.aftmbToken,
      symbol: Token.aFTMb,
      decimals: 18,
    });
  }

  public async getFtmBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const ftmBalance = await web3.eth.getBalance(this.currentAccount);

    return this.convertFromWei(ftmBalance);
  }

  public async getAftmbBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const aFTMbContract = this.getAftmbTokenContract(provider);

    const aFTMbBalance = await aFTMbContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(aFTMbBalance);
  }

  public async getAftmbAPY(): Promise<BigNumber> {
    const provider = await this.getProvider();

    const aFTMbContract = this.getAftmbTokenContract(provider);

    return getAPY({
      tokenContract: aFTMbContract,
      web3: provider.getWeb3(),
    });
  }
}

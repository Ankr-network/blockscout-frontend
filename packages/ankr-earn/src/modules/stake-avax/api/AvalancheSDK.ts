import BigNumber from 'bignumber.js';
import { BlockTransactionObject } from 'web3-eth';
import { Contract, EventData, Filter } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import {
  BlockchainNetworkId,
  TWeb3BatchCallback,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from 'provider';

import { configFromEnv } from 'modules/api/config';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { isMainnet } from 'modules/common/const';

import {
  AVALANCHE_READ_PROVIDER_ID,
  AVAX_DECIMALS,
  AVAX_MAX_BLOCK_RANGE,
  AVAX_MAX_HISTORY_RANGE,
  AVAX_MAX_PARALLEL_REQ,
  AVAX_SCALE_FACTOR,
} from '../const';

import ABI_AVALANCHE_POOL from './contracts/AvalanchePool.json';
import ABI_AAVAXB from './contracts/FutureBondAVAX.json';

type TPastEventsData = EventData[];

export type TTxEventsHistoryGroupData = ITxEventsHistoryGroupItem[];

enum EAvalanchePoolEvents {
  AvaxClaimPending = 'AvaxClaimPending',
  StakePending = 'StakePending',
}

export enum EAvalanchePoolEventsMap {
  AvaxClaimPending = 'STAKE_ACTION_UNSTAKED',
  StakePending = 'STAKE_ACTION_STAKED',
}

interface IAvalancheSDKProviders {
  readProvider: Web3KeyReadProvider;
  writeProvider: Web3KeyWriteProvider;
}

interface IGetPastEvents {
  provider: Web3KeyWriteProvider | Web3KeyReadProvider;
  contract: Contract;
  eventName: string;
  filter?: Filter;
}

export interface ITxEventsHistoryGroupItem {
  txAmount: BigNumber;
  txDate: Date;
  txHash: string;
  txType: string | null;
}

export interface ITxEventsHistoryData {
  completed: TTxEventsHistoryGroupData;
  pending: TTxEventsHistoryGroupData;
}

interface ITxHistoryEventData extends EventData {
  timestamp: number;
}

export class AvalancheSDK {
  private readonly readProvider: Web3KeyReadProvider;

  private readonly writeProvider: Web3KeyWriteProvider;

  private static instance?: AvalancheSDK;

  private currentAccount: string;

  private constructor({ readProvider, writeProvider }: IAvalancheSDKProviders) {
    AvalancheSDK.instance = this;

    this.currentAccount = writeProvider.currentAccount;
    this.readProvider = readProvider;
    this.writeProvider = writeProvider;
  }

  private convertFromWei(amount: string): BigNumber {
    return new BigNumber(this.readProvider.getWeb3().utils.fromWei(amount));
  }

  private convertToHex(amount: BigNumber): string {
    return this.readProvider
      .getWeb3()
      .utils.numberToHex(amount.multipliedBy(AVAX_SCALE_FACTOR).toString(10));
  }

  private async getAAVAXBTokenContract(isForceRead = false): Promise<Contract> {
    const { avalancheConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_AAVAXB as AbiItem[],
      avalancheConfig.futureBondAVAX,
    );
  }

  private async getAvalanchePoolContract(
    isForceRead = false,
  ): Promise<Contract> {
    const { avalancheConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_AVALANCHE_POOL as AbiItem[],
      avalancheConfig.avalanchePool,
    );
  }

  private async getPastEvents({
    provider,
    contract,
    eventName,
    filter,
  }: IGetPastEvents): Promise<TPastEventsData> {
    const web3 = provider.getWeb3();
    const latestBlockNumber = await web3.eth.getBlockNumber();

    if (latestBlockNumber <= AVAX_MAX_HISTORY_RANGE) {
      return [];
    }

    const startBlockNumber = latestBlockNumber - AVAX_MAX_HISTORY_RANGE;

    const eventsPromises: Promise<EventData[]>[][] = [];

    for (
      let i = startBlockNumber, idx = 0, parallelReqCounter = 1;
      i < latestBlockNumber;
      i += AVAX_MAX_BLOCK_RANGE, parallelReqCounter += 1
    ) {
      const fromBlock = i;
      const toBlock = fromBlock + AVAX_MAX_BLOCK_RANGE;

      if (typeof eventsPromises[idx] === 'undefined') {
        eventsPromises[idx] = [];
      }

      eventsPromises[idx].push(
        contract.getPastEvents(eventName, {
          fromBlock,
          toBlock,
          filter,
        }),
      );

      if (parallelReqCounter === AVAX_MAX_PARALLEL_REQ) {
        parallelReqCounter = 0;
        idx += 1;
      }
    }

    if (!eventsPromises.length || !eventsPromises[0]?.length) {
      return [];
    }

    const pastEvents = await Promise.all(
      eventsPromises.map(async evPromisesGroup => {
        const eventsData = await Promise.all(evPromisesGroup);

        return eventsData.flat();
      }),
    );

    return pastEvents.flat();
  }

  private async getProvider(
    isForceRead = false,
  ): Promise<Web3KeyWriteProvider | Web3KeyReadProvider> {
    if (isForceRead) {
      return this.readProvider;
    }

    const isAvalancheChain = await this.isAvalancheNetwork(this.writeProvider);

    if (isAvalancheChain && !this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    if (isAvalancheChain) {
      return this.writeProvider;
    }

    return this.readProvider;
  }

  // todo: reuse it form stake/api/getTxEventsHistoryGroup
  private async getTxEventsHistoryGroup(
    rawEvents?: TPastEventsData,
  ): Promise<TTxEventsHistoryGroupData> {
    if (!Array.isArray(rawEvents) || !rawEvents.length) {
      return [];
    }

    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    const calls = rawEvents.map(
      event => (callback: TWeb3BatchCallback<BlockTransactionObject>) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore https://github.com/ChainSafe/web3.js/issues/4655
        web3.eth.getBlock.request(event.blockHash, false, callback),
    );

    const blocks = await provider.executeBatchCalls<BlockTransactionObject>(
      calls,
    );

    const rawData: ITxHistoryEventData[] = blocks.map((block, index) => ({
      ...rawEvents[index],
      timestamp: block.timestamp as number,
    }));

    return rawData
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(
        ({ event, returnValues: { amount }, timestamp, transactionHash }) => ({
          txAmount: this.convertFromWei(amount),
          txDate: new Date(timestamp * 1_000),
          txHash: transactionHash,
          txType: this.getTxType(event),
        }),
      );
  }

  private getTxType(rawTxType?: string): string | null {
    switch (rawTxType) {
      case EAvalanchePoolEvents.StakePending:
        return EAvalanchePoolEventsMap.StakePending;

      case EAvalanchePoolEvents.AvaxClaimPending:
        return EAvalanchePoolEventsMap.AvaxClaimPending;

      default:
        return null;
    }
  }

  private async isAvalancheNetwork(
    provider: Web3KeyWriteProvider,
  ): Promise<boolean> {
    const web3 = provider.getWeb3();
    const chainId = await web3.eth.getChainId();

    return [
      BlockchainNetworkId.avalanche,
      BlockchainNetworkId.avalancheTestnet,
    ].includes(chainId);
  }

  public static async getInstance(): Promise<AvalancheSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();
    const [writeProvider, readProvider] = await Promise.all([
      providerManager.getETHWriteProvider(),
      providerManager.getETHReadProvider(AVALANCHE_READ_PROVIDER_ID),
    ]);

    const addrHasNotBeenUpdated =
      AvalancheSDK.instance?.currentAccount === writeProvider.currentAccount;
    const hasNewProvider =
      AvalancheSDK.instance?.writeProvider === writeProvider &&
      AvalancheSDK.instance?.readProvider === readProvider;

    if (AvalancheSDK.instance && addrHasNotBeenUpdated && hasNewProvider) {
      return AvalancheSDK.instance;
    }

    const instance = new AvalancheSDK({ writeProvider, readProvider });
    const isAvalancheChain = await instance.isAvalancheNetwork(writeProvider);

    if (isAvalancheChain && !writeProvider.isConnected()) {
      await writeProvider.connect();
    }

    return instance;
  }

  public async addAAVAXBToWallet(): Promise<void> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const { avalancheConfig } = configFromEnv();

    const aAVAXbTokenContract = await this.getAAVAXBTokenContract();

    const [symbol, rawDecimals]: [string, string] = await Promise.all([
      aAVAXbTokenContract.methods.symbol().call(),
      aAVAXbTokenContract.methods.decimals().call(),
    ]);

    const decimals = Number.parseInt(rawDecimals, 10);

    await this.writeProvider.addTokenToWallet({
      address: avalancheConfig.futureBondAVAX,
      symbol,
      decimals,
      chainId: isMainnet
        ? (BlockchainNetworkId.avalanche as number)
        : (BlockchainNetworkId.avalancheTestnet as number),
    });
  }

  public async getAAVAXBBalance(): Promise<BigNumber> {
    const aAVAXbTokenContract = await this.getAAVAXBTokenContract();

    const balance = await aAVAXbTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  public async getAVAXBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const currBalance = await web3.eth.getBalance(this.currentAccount);

    return this.readProvider.getFormattedBalance(currBalance, AVAX_DECIMALS);
  }

  public async getMinimumStake(): Promise<BigNumber> {
    const avalanchePoolContract = await this.getAvalanchePoolContract();

    const minStake = await avalanchePoolContract.methods
      .getMinimumStake()
      .call();

    return this.convertFromWei(minStake);
  }

  public async getPendingUnstakes(): Promise<BigNumber> {
    const avalanchePoolContract = await this.getAvalanchePoolContract();

    const pending = await avalanchePoolContract.methods
      .pendingAvaxClaimsOf(this.currentAccount)
      .call();

    return this.convertFromWei(pending);
  }

  public async getTxEventsHistory(): Promise<ITxEventsHistoryData> {
    const avalanchePoolContract = await this.getAvalanchePoolContract(true);

    const [stakeRawEvents, unstakeRawEvents]: [
      TPastEventsData,
      TPastEventsData,
    ] = await Promise.all([
      this.getPastEvents({
        provider: this.readProvider,
        contract: avalanchePoolContract,
        eventName: EAvalanchePoolEvents.StakePending,
        filter: { staker: this.currentAccount },
      }),
      this.getPastEvents({
        provider: this.readProvider,
        contract: avalanchePoolContract,
        eventName: EAvalanchePoolEvents.AvaxClaimPending,
        filter: { claimer: this.currentAccount },
      }),
    ]);

    let pendingUnstakes = await this.getPendingUnstakes();
    let completedRawEvents: TPastEventsData = [];
    let pendingRawEvents: TPastEventsData = [];

    if (pendingUnstakes.isGreaterThan(0)) {
      const unstakeRawEventsReverse: TPastEventsData =
        unstakeRawEvents.reverse();

      for (let i = 0; i < unstakeRawEventsReverse.length; i += 1) {
        const unstakeRawEventItem = unstakeRawEventsReverse[i];
        const itemAmount = this.convertFromWei(
          unstakeRawEventItem.returnValues.amount,
        );
        pendingUnstakes = pendingUnstakes.minus(itemAmount);

        pendingRawEvents = [...pendingRawEvents, unstakeRawEventItem];

        if (pendingUnstakes.isZero()) {
          break;
        }
      }

      completedRawEvents = [
        ...stakeRawEvents,
        ...unstakeRawEventsReverse.slice(pendingRawEvents.length),
      ];
    } else {
      completedRawEvents = [...stakeRawEvents, ...unstakeRawEvents];
    }

    const [completed, pending] = await Promise.all([
      this.getTxEventsHistoryGroup(completedRawEvents),
      this.getTxEventsHistoryGroup(pendingRawEvents),
    ]);

    return { completed, pending };
  }

  public async stake(amount: BigNumber): Promise<void> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const avalanchePoolContract = await this.getAvalanchePoolContract();

    await avalanchePoolContract.methods.stake().send({
      from: this.currentAccount,
      value: this.convertToHex(amount),
    });
  }

  public async unstake(amount: BigNumber): Promise<void> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const avalanchePoolContract = await this.getAvalanchePoolContract();
    const value = this.convertToHex(amount);

    await avalanchePoolContract.methods.claim(value).send({
      from: this.currentAccount,
    });
  }
}

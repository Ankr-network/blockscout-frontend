import BigNumber from 'bignumber.js';
import flatten from 'lodash/flatten';
import { TransactionReceipt } from 'web3-core';
import { Contract, EventData, Filter } from 'web3-eth-contract';

import {
  AvailableReadProviders,
  AvailableWriteProviders,
  BlockchainNetworkId,
  IWeb3SendResult,
  ProviderManager,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from 'provider';

import { configFromEnv } from 'modules/api/config';
import AETHC_CONTRACT from 'modules/api/contract/AETH.json';
import EHT_POOL_CONTRACT from 'modules/api/contract/EthereumPool.json';
import AETHB_CONTRACT from 'modules/api/contract/FETH.json';
import ABI_SYSTEM from 'modules/api/contract/SystemParameters.json';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import {
  ETH_SCALE_FACTOR,
  isMainnet,
  MAX_UINT256,
  ZERO,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { convertNumberToHex } from 'modules/common/utils/numbers/converters';
import { getTxEventsHistoryGroup } from 'modules/stake/api/getTxEventsHistoryGroup';

import { ISwitcher } from '../switcher';

import {
  ETH_BLOCK_OFFSET,
  ETH_HISTORY_RANGE_STEP,
  methodNameMap,
} from './const';

export type TEthToken = Token.aETHb | Token.aETHc;

export interface IGetSwitcherServiceArgs {
  providerManager: ProviderManager;
  providerId: AvailableWriteProviders;
}

export interface IGetSwitcherServiceData {
  ratio: BigNumber;
  aethBalance: BigNumber;
  fethBalance: BigNumber;
  allowance: BigNumber;
}

export interface IGetTxData {
  amount?: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
}

export interface ISharesArgs {
  amount: BigNumber;
}

export interface IEthSDKProviders {
  readProvider: Web3KeyReadProvider;
  writeProvider: Web3KeyWriteProvider;
}

export interface ITxEventsHistoryGroupItem {
  txAmount: BigNumber;
  txDate: Date;
  txHash: string;
  txType: string | null;
}

export interface ITxEventsHistoryData {
  completedAETHC: ITxEventsHistoryGroupItem[];
  completedAETHB: ITxEventsHistoryGroupItem[];
  pending: ITxEventsHistoryGroupItem[];
  totalPending: BigNumber;
}

interface IGetPastEvents {
  provider: Web3KeyWriteProvider | Web3KeyReadProvider;
  contract: Contract;
  eventName: string;
  startBlock: number;
  rangeStep: number;
  filter?: Filter;
}

enum EPoolEvents {
  StakeConfirmed = 'StakeConfirmed',
  StakePending = 'StakePending',
  RewardClaimed = 'RewardClaimed',
}

const CONFIG = configFromEnv();

const tokensConfigMap = {
  aETHc: {
    address: CONFIG.contractConfig.aethContract,
    symbol: 'aETHc',
    decimals: 18,
  },

  aETHb: {
    address: CONFIG.contractConfig.fethContract,
    symbol: 'aETHb',
    decimals: 18,
  },
};

export class EthSDK implements ISwitcher {
  private static instance?: EthSDK;

  private readonly writeProvider: Web3KeyWriteProvider;

  private readonly readProvider: Web3KeyReadProvider;

  private currentAccount: string;

  private stakeGasFee?: BigNumber;

  private constructor({ readProvider, writeProvider }: IEthSDKProviders) {
    EthSDK.instance = this;

    this.currentAccount = writeProvider.currentAccount;
    this.readProvider = readProvider;
    this.writeProvider = writeProvider;
  }

  public static async getInstance(): Promise<EthSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();
    const [writeProvider, readProvider] = await Promise.all([
      providerManager.getETHWriteProvider(),
      providerManager.getETHReadProvider(
        isMainnet
          ? AvailableReadProviders.ethMainnet
          : AvailableReadProviders.ethGoerli,
      ),
    ]);

    const addrHasNotBeenUpdated =
      EthSDK.instance?.currentAccount === writeProvider.currentAccount;
    const hasNewProvider =
      EthSDK.instance?.writeProvider === writeProvider &&
      EthSDK.instance?.readProvider === readProvider;

    if (EthSDK.instance && addrHasNotBeenUpdated && hasNewProvider) {
      return EthSDK.instance;
    }

    const instance = new EthSDK({ writeProvider, readProvider });
    const isEthChain = instance.getIsEthChain();

    if (isEthChain && !writeProvider.isConnected()) {
      await writeProvider.connect();
    }

    return instance;
  }

  private getIsEthChain(): boolean {
    return [BlockchainNetworkId.mainnet, BlockchainNetworkId.goerli].includes(
      this.writeProvider.currentChain,
    );
  }

  public async getEthBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const balance = await web3.eth.getBalance(this.currentAccount);

    return new BigNumber(web3.utils.fromWei(balance));
  }

  private async getProvider(): Promise<
    Web3KeyWriteProvider | Web3KeyReadProvider
  > {
    const isEthChain = this.getIsEthChain();

    if (isEthChain) {
      await this.connectWriteProvider();
      return this.writeProvider;
    }

    return this.readProvider;
  }

  public async getABBalance(isFormatted?: boolean): Promise<BigNumber> {
    const provider = await this.getProvider();
    const aETHbContract = EthSDK.getAethbContract(provider);
    const web3 = provider.getWeb3();

    const rawBalance = await aETHbContract.methods
      .balanceOf(this.currentAccount)
      .call();

    const balance = isFormatted ? web3.utils.fromWei(rawBalance) : rawBalance;

    return new BigNumber(balance);
  }

  private static getAethbContract(
    provider: Web3KeyWriteProvider | Web3KeyReadProvider,
  ): Contract {
    const { contractConfig } = CONFIG;

    return provider.createContract(AETHB_CONTRACT, contractConfig.fethContract);
  }

  public async getACBalance(isFormatted?: boolean): Promise<BigNumber> {
    const provider = await this.getProvider();
    const aETHcContract = EthSDK.getAethcContract(provider);
    const web3 = provider.getWeb3();

    const rawBalance = await aETHcContract.methods
      .balanceOf(this.currentAccount)
      .call();

    const balance = isFormatted ? web3.utils.fromWei(rawBalance) : rawBalance;

    return new BigNumber(balance);
  }

  private static getAethcContract(
    provider: Web3KeyWriteProvider | Web3KeyReadProvider,
  ): Contract {
    const { contractConfig } = CONFIG;

    return provider.createContract(AETHC_CONTRACT, contractConfig.aethContract);
  }

  public async getACRatio(isFormatted?: boolean): Promise<BigNumber> {
    const provider = await this.getProvider();
    const aETHcContract = EthSDK.getAethcContract(provider);
    const web3 = provider.getWeb3();

    const rawRatio = await aETHcContract.methods.ratio().call();
    const ratio = isFormatted ? web3.utils.fromWei(rawRatio) : rawRatio;

    return new BigNumber(ratio);
  }

  public async addTokenToWallet(token: Token): Promise<boolean> {
    await this.connectWriteProvider();

    const data = tokensConfigMap[token as keyof typeof tokensConfigMap];

    if (!data) {
      throw new Error('Failed to add token to wallet');
    }

    return this.writeProvider.addTokenToWallet(data);
  }

  private async connectWriteProvider(): Promise<void> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }
  }

  public async getACAllowance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const aETHcContract = EthSDK.getAethcContract(provider);
    const { contractConfig } = CONFIG;

    const allowance = await aETHcContract.methods
      .allowance(this.currentAccount, contractConfig.fethContract)
      .call();

    return new BigNumber(allowance);
  }

  /**
   * This method is only for creating a testing ability.
   * It is related to the [STAKAN-1259](https://ankrnetwork.atlassian.net/browse/STAKAN-1259)
   * Do not use it for the production code.
   * @deprecated
   */
  public async stakeWithoutClaim(amount: BigNumber): Promise<IWeb3SendResult> {
    await this.connectWriteProvider();

    const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);

    const ethPoolContract = EthSDK.getEthPoolContract(this.writeProvider);

    return ethPoolContract.methods.stake().send({
      from: this.currentAccount,
      value: hexAmount,
    });
  }

  public async stake(
    amount: BigNumber,
    token: TEthToken,
  ): Promise<IWeb3SendResult> {
    await this.connectWriteProvider();

    try {
      let gasFee = this.stakeGasFee;
      if (!gasFee) {
        gasFee = await this.getStakeGasFee(amount, token);
      }

      const balance = await this.getEthBalance();
      const maxAmount = balance.minus(gasFee);
      const stakeAmount = amount.isGreaterThan(maxAmount) ? maxAmount : amount;
      const hexAmount = convertNumberToHex(stakeAmount, ETH_SCALE_FACTOR);

      const ethPoolContract = EthSDK.getEthPoolContract(this.writeProvider);

      const contractStake = ethPoolContract.methods[methodNameMap[token].stake];

      const gasLimit: number = await contractStake().estimateGas({
        from: this.currentAccount,
        value: hexAmount,
      });

      return contractStake().send({
        from: this.currentAccount,
        value: hexAmount,
        gas: gasLimit,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      throw new Error('The error occured, please, try again later.');
    }
  }

  public async getStakeGasFee(
    amount: BigNumber,
    token: TEthToken,
  ): Promise<BigNumber> {
    const provider = await this.getProvider();
    const ethPoolContract = EthSDK.getEthPoolContract(provider);

    const contractStake = ethPoolContract.methods[methodNameMap[token].stake];

    const estimatedGas: number = await contractStake().estimateGas({
      from: this.currentAccount,
      value: convertNumberToHex(amount, ETH_SCALE_FACTOR),
    });

    const stakeGasFee = await provider.getContractMethodFee(estimatedGas);

    this.stakeGasFee = stakeGasFee;

    return stakeGasFee;
  }

  private static getEthPoolContract(
    provider: Web3KeyWriteProvider | Web3KeyReadProvider,
  ): Contract {
    const { contractConfig } = CONFIG;

    return provider.createContract(
      EHT_POOL_CONTRACT,
      contractConfig.ethereumPool,
    );
  }

  public async getMinStake(): Promise<BigNumber> {
    const { contractConfig } = CONFIG;
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    const systemContract = provider.createContract(
      ABI_SYSTEM,
      contractConfig.systemContract,
    );

    const minStake = await systemContract.methods
      .REQUESTER_MINIMUM_POOL_STAKING()
      .call();

    return new BigNumber(web3.utils.fromWei(minStake));
  }

  public async fetchTxData(
    txHash: string,
    shouldDecodeAmount = true,
  ): Promise<IGetTxData> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const tx = await web3.eth.getTransaction(txHash);

    const decodeAmount = (): BigNumber => {
      const { 0: rawAmount } =
        tx.value === '0'
          ? web3.eth.abi.decodeParameters(['uint256'], tx.input.slice(10))
          : { 0: tx.value };

      return new BigNumber(web3.utils.fromWei(rawAmount));
    };

    return {
      amount: shouldDecodeAmount ? decodeAmount() : undefined,
      destinationAddress: tx.from as string | undefined,
      isPending: tx.transactionIndex === null,
    };
  }

  public async fetchTxReceipt(
    txHash: string,
  ): Promise<TransactionReceipt | null> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    const receipt = await web3.eth.getTransactionReceipt(txHash);

    return receipt as TransactionReceipt | null;
  }

  public async getTxEventsHistory(): Promise<ITxEventsHistoryData> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const ethPoolContract = EthSDK.getEthPoolContract(provider);

    const latestBlockNumber = await web3.eth.getBlockNumber();
    const startBlock = latestBlockNumber - ETH_BLOCK_OFFSET;

    const [claimEvents, ratio] = await Promise.all([
      this.getPastEvents({
        provider: this.readProvider,
        contract: ethPoolContract,
        eventName: EPoolEvents.RewardClaimed,
        startBlock,
        rangeStep: ETH_HISTORY_RANGE_STEP,
        filter: {
          staker: this.currentAccount,
        },
      }),
      this.getACRatio(),
    ]);

    const mapEvents = (events: EventData[]): EventData[] =>
      events.map(event => ({
        ...event,
        returnValues: {
          ...event.returnValues,
          amount: new BigNumber(event.returnValues.amount)
            .dividedBy(ratio)
            .multipliedBy(10 ** 18)
            .toFixed(),
        },
      }));

    const [completedAETHC, completedAETHB] = await Promise.all([
      getTxEventsHistoryGroup({
        rawEvents: mapEvents(
          claimEvents.filter(({ returnValues }) => returnValues.isAETH),
        ),
        web3,
      }),
      getTxEventsHistoryGroup({
        rawEvents: mapEvents(
          claimEvents.filter(({ returnValues }) => !returnValues.isAETH),
        ),
        web3,
      }),
    ]);

    return { completedAETHC, completedAETHB, pending: [], totalPending: ZERO };
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

  public async approveACForAB(amount = MAX_UINT256): Promise<IWeb3SendResult> {
    await this.connectWriteProvider();

    const { contractConfig } = CONFIG;

    const aETHcContract = EthSDK.getAethcContract(this.writeProvider);

    const data = aETHcContract.methods
      .approve(contractConfig.fethContract, convertNumberToHex(amount))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.aethContract,
      { data, estimate: true },
    );
  }

  public async lockShares({ amount }: ISharesArgs): Promise<IWeb3SendResult> {
    await this.connectWriteProvider();
    const aETHbContract = EthSDK.getAethbContract(this.writeProvider);
    const { contractConfig } = CONFIG;

    const data = aETHbContract.methods
      .lockShares(convertNumberToHex(amount, ETH_SCALE_FACTOR))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.fethContract,
      { data, estimate: true },
    );
  }

  public async unlockShares({ amount }: ISharesArgs): Promise<IWeb3SendResult> {
    await this.connectWriteProvider();
    const aETHbContract = EthSDK.getAethbContract(this.writeProvider);
    const { contractConfig } = CONFIG;

    const data = aETHbContract.methods
      .unlockShares(convertNumberToHex(amount, ETH_SCALE_FACTOR))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.fethContract,
      { data, estimate: true },
    );
  }

  public async getClaimable(token: TEthToken): Promise<BigNumber> {
    const provider = await this.getProvider();
    const ethPoolContract = EthSDK.getEthPoolContract(provider);
    const web3 = provider.getWeb3();

    const contractGetClaimable =
      ethPoolContract.methods[methodNameMap[token].claimable];

    const rawValue = await contractGetClaimable(this.currentAccount).call();

    return new BigNumber(web3.utils.fromWei(rawValue));
  }

  public async claim(token: TEthToken): Promise<IWeb3SendResult> {
    await this.connectWriteProvider();
    const { contractConfig } = CONFIG;
    const ethPoolContract = EthSDK.getEthPoolContract(this.writeProvider);
    const contractClaim = ethPoolContract.methods[methodNameMap[token].claim];
    const data: string = contractClaim().encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.ethereumPool,
      { data },
    );
  }
}

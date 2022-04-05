import BigNumber from 'bignumber.js';
import flatten from 'lodash/flatten';
import { TransactionReceipt } from 'web3-core';
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
import ABI_ERC20 from 'modules/api/contract/IERC20.json';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { isMainnet } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import {
  BINANCE_POOL_CONTRACT_START_BLOCK,
  BINANCE_READ_PROVIDER_ID,
  BNB_MAX_BLOCK_RANGE,
  BNB_SAFE_PRECISION,
} from '../const';
import { TBnbSyntToken } from '../types';

import ABI_ABNBB from './contracts/aBNBb.json';
import ABI_ABNBC from './contracts/aBNBc.json';
import ABI_BINANCE_POOL from './contracts/BinancePool.json';

type TPastEventsData = EventData[];

export type TTxEventsHistoryGroupData = ITxEventsHistoryGroupItem[];

enum EBinancePoolEvents {
  RatioUpdated = 'RatioUpdated',
  Staked = 'Staked',
  UnstakePending = 'UnstakePending',
}

export enum EBinancePoolEventsMap {
  Staked = 'STAKE_ACTION_STAKED',
  UnstakePending = 'STAKE_ACTION_UNSTAKED',
}

interface ITxHistoryEventData extends EventData {
  timestamp: number;
}

export interface ITxEventsHistoryGroupItem {
  txAmount: BigNumber;
  txDate: Date;
  txHash: string;
  txType: string | null;
}

export interface IGetTxData {
  amount: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
}

export interface ITxEventsHistoryData {
  completed: TTxEventsHistoryGroupData;
  pending: TTxEventsHistoryGroupData;
}

interface IBinanceSDKProviders {
  readProvider: Web3KeyReadProvider;
  writeProvider: Web3KeyWriteProvider;
}

interface IGetPastEvents {
  provider: Web3KeyWriteProvider | Web3KeyReadProvider;
  contract: Contract;
  eventName: string;
  startBlock: number;
  rangeStep: number;
  filter?: Filter;
}

export class BinanceSDK {
  private static instance?: BinanceSDK;

  private readonly writeProvider: Web3KeyWriteProvider;

  private readonly readProvider: Web3KeyReadProvider;

  private currentAccount: string;

  private stakeGasFee?: BigNumber;

  private constructor({ readProvider, writeProvider }: IBinanceSDKProviders) {
    BinanceSDK.instance = this;

    this.currentAccount = writeProvider.currentAccount;
    this.readProvider = readProvider;
    this.writeProvider = writeProvider;
  }

  public static async getInstance(): Promise<BinanceSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();
    const [writeProvider, readProvider] = await Promise.all([
      providerManager.getETHWriteProvider(),
      providerManager.getETHReadProvider(BINANCE_READ_PROVIDER_ID),
    ]);

    const addrHasNotBeenUpdated =
      BinanceSDK.instance?.currentAccount === writeProvider.currentAccount;
    const hasNewProvider =
      BinanceSDK.instance?.writeProvider === writeProvider &&
      BinanceSDK.instance?.readProvider === readProvider;

    if (BinanceSDK.instance && addrHasNotBeenUpdated && hasNewProvider) {
      return BinanceSDK.instance;
    }

    const instance = new BinanceSDK({ writeProvider, readProvider });
    const isBinanceChain = await instance.isBinanceNetwork(writeProvider);

    if (isBinanceChain && !writeProvider.isConnected()) {
      await writeProvider.connect();
    }

    return instance;
  }

  private async getProvider(
    isForceRead = false,
  ): Promise<Web3KeyWriteProvider | Web3KeyReadProvider> {
    if (isForceRead) {
      return this.readProvider;
    }

    const isBinanceChain = await this.isBinanceNetwork(this.writeProvider);

    if (isBinanceChain && !this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    if (isBinanceChain) {
      return this.writeProvider;
    }

    return this.readProvider;
  }

  private async isBinanceNetwork(
    provider: Web3KeyWriteProvider,
  ): Promise<boolean> {
    const web3 = provider.getWeb3();
    const chainId = await web3.eth.getChainId();

    return [
      BlockchainNetworkId.smartchain,
      BlockchainNetworkId.smartchainTestnet,
    ].includes(chainId);
  }

  private async getPastEvents({
    provider,
    contract,
    eventName,
    startBlock,
    rangeStep,
    filter,
  }: IGetPastEvents): Promise<TPastEventsData> {
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

  private convertFromWei(amount: string): BigNumber {
    return new BigNumber(this.readProvider.getWeb3().utils.fromWei(amount));
  }

  private convertToHex(amount: BigNumber): string {
    return this.readProvider
      .getWeb3()
      .utils.numberToHex(amount.multipliedBy(1e18).toString(10));
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
      case EBinancePoolEvents.Staked:
        return EBinancePoolEventsMap.Staked;

      case EBinancePoolEvents.UnstakePending:
        return EBinancePoolEventsMap.UnstakePending;

      default:
        return null;
    }
  }

  private async getABNBBContract(isForceRead = false): Promise<Contract> {
    const { binanceConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_ABNBB as AbiItem[],
      binanceConfig.aBNBbToken,
    );
  }

  private async getBinancePoolContract(isForceRead = false): Promise<Contract> {
    const { binanceConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_BINANCE_POOL as AbiItem[],
      binanceConfig.binancePool,
    );
  }

  private async getWrappedBNBContract(isForceRead = false): Promise<Contract> {
    const { binanceConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_ERC20 as AbiItem[],
      binanceConfig.WBNBContract,
    );
  }

  public async addTokenToWallet(token: TBnbSyntToken): Promise<void> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const { binanceConfig } = configFromEnv();
    const isAbnbb = token === Token.aBNBb;

    const tokenContract = isAbnbb
      ? await this.getABNBBContract()
      : await this.getABNBCContract();

    const address = isAbnbb
      ? binanceConfig.aBNBbToken
      : binanceConfig.aBNBcToken;

    const [symbol, rawDecimals]: [string, string] = await Promise.all([
      tokenContract.methods.symbol().call(),
      tokenContract.methods.decimals().call(),
    ]);

    const decimals = Number.parseInt(rawDecimals, 10);

    const chainId: number = isMainnet
      ? BlockchainNetworkId.smartchain
      : BlockchainNetworkId.smartchainTestnet;

    await this.writeProvider.addTokenToWallet({
      address,
      symbol,
      decimals,
      chainId,
    });
  }

  public async getABNBBBalance(): Promise<BigNumber> {
    const aBNBbTokenContract = await this.getABNBBContract();

    const balance = await aBNBbTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  public async getBNBBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const contract = await this.getWrappedBNBContract();

    const [currBalance, decimals] = await Promise.all([
      web3.eth.getBalance(this.currentAccount),
      contract.methods.decimals().call(),
    ]);

    return this.readProvider.getFormattedBalance(currBalance, decimals);
  }

  public async getMinimumStake(): Promise<BigNumber> {
    const binancePoolContract = await this.getBinancePoolContract();

    const minStake = await binancePoolContract.methods.getMinimumStake().call();

    return this.convertFromWei(minStake);
  }

  public async getPendingUnstakes(): Promise<BigNumber> {
    const binancePoolContract = await this.getBinancePoolContract();

    const pending = await binancePoolContract.methods
      .pendingUnstakesOf(this.currentAccount)
      .call();

    return this.convertFromWei(pending);
  }

  public async getRelayerFee(): Promise<BigNumber> {
    const binancePoolContract = await this.getBinancePoolContract();

    const relayerFee = await binancePoolContract.methods.getRelayerFee().call();

    return this.convertFromWei(relayerFee);
  }

  public async getStakeGasFee(
    amount: BigNumber,
    token: TBnbSyntToken,
  ): Promise<BigNumber> {
    const provider = await this.getProvider();
    const binancePoolContract = await this.getBinancePoolContract();

    const bnbSpecificAmount = new BigNumber(
      amount.toPrecision(BNB_SAFE_PRECISION, BigNumber.ROUND_HALF_DOWN),
    );

    const contractStake =
      binancePoolContract.methods[this.getStakeMethodName(token)];

    const estimatedGas: number = await contractStake().estimateGas({
      from: this.currentAccount,
      value: this.convertToHex(bnbSpecificAmount),
    });

    const stakeGasFee = await provider.getContractMethodFee(estimatedGas);

    this.stakeGasFee = stakeGasFee;

    return stakeGasFee;
  }

  private getStakeMethodName(token: TBnbSyntToken) {
    switch (token) {
      case Token.aBNBc:
        return 'stakeAndClaimCerts';

      default:
        return 'stakeAndClaimBonds';
    }
  }

  public async getTxEventsHistory(): Promise<ITxEventsHistoryData> {
    const binancePoolContract = await this.getBinancePoolContract(true);

    const [stakeRawEvents, unstakeRawEvents]: [
      TPastEventsData,
      TPastEventsData,
    ] = await Promise.all([
      this.getPastEvents({
        provider: this.readProvider,
        contract: binancePoolContract,
        eventName: EBinancePoolEvents.Staked,
        startBlock: BINANCE_POOL_CONTRACT_START_BLOCK,
        rangeStep: BNB_MAX_BLOCK_RANGE,
        filter: { delegator: this.currentAccount },
      }),
      this.getPastEvents({
        provider: this.readProvider,
        contract: binancePoolContract,
        eventName: EBinancePoolEvents.UnstakePending,
        startBlock: BINANCE_POOL_CONTRACT_START_BLOCK,
        rangeStep: BNB_MAX_BLOCK_RANGE,
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

  public async fetchTxData(txHash: string): Promise<IGetTxData> {
    const provider = await this.getProvider();

    const web3 = provider.getWeb3();

    const tx = await web3.eth.getTransaction(txHash);

    return {
      amount: this.convertFromWei(tx.value),
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

  public async stake(
    amount: BigNumber,
    token: TBnbSyntToken,
  ): Promise<{ txHash: string }> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    let gasFee = this.stakeGasFee;
    if (!gasFee) {
      gasFee = await this.getStakeGasFee(amount, token);
    }

    const balance = await this.getBNBBalance();
    const maxAmount = balance.minus(gasFee);
    const stakeAmount = amount.isGreaterThan(maxAmount) ? maxAmount : amount;
    const binancePoolContract = await this.getBinancePoolContract();

    const bnbSpecificAmount = new BigNumber(
      stakeAmount.toPrecision(BNB_SAFE_PRECISION, BigNumber.ROUND_HALF_DOWN),
    );

    const contractStake =
      binancePoolContract.methods[this.getStakeMethodName(token)];

    const gasLimit: number = await contractStake().estimateGas({
      from: this.currentAccount,
      value: this.convertToHex(bnbSpecificAmount),
    });

    const tx = await contractStake().send({
      from: this.currentAccount,
      value: this.convertToHex(bnbSpecificAmount),
      gas: gasLimit,
    });

    return { txHash: tx.transactionHash };
  }

  public async unstake(amount: BigNumber, token: TBnbSyntToken): Promise<void> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const binancePoolContract = await this.getBinancePoolContract();
    const hexAmount = this.convertToHex(amount);

    const contractUnstake =
      binancePoolContract.methods[this.getUnstakeMethodName(token)];

    await contractUnstake(hexAmount).send({
      from: this.currentAccount,
    });
  }

  private getUnstakeMethodName(token: TBnbSyntToken) {
    switch (token) {
      case Token.aBNBc:
        return 'unstakeCerts';

      default:
        return 'unstakeBonds';
    }
  }

  public async getABNBCRatio(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const aBNBcContract = await this.getABNBCContract();
    const web3 = provider.getWeb3();

    const rawRatio = await aBNBcContract.methods.ratio().call();
    const ratio = web3.utils.fromWei(rawRatio);

    return new BigNumber(ratio);
  }

  private async getABNBCContract(isForceRead = false): Promise<Contract> {
    const { binanceConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);

    return provider.createContract(ABI_ABNBC, binanceConfig.aBNBcToken);
  }

  public async getABNBCBalance(): Promise<BigNumber> {
    const aBNBcContract = await this.getABNBCContract();

    const rawBalance = await aBNBcContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(rawBalance);
  }

  public async approveABNBCUnstake(amount: BigNumber): Promise<boolean> {
    const isAllowed = await this.checkAllowance(amount);

    if (isAllowed) {
      return true;
    }

    const { binanceConfig } = configFromEnv();

    const aBNBcContract = await this.getABNBCContract();
    const web3 = this.writeProvider.getWeb3();

    const rawAmount = web3.utils.toWei(amount.toString());

    const data = aBNBcContract.methods
      .approve(binanceConfig.aBNBbToken, rawAmount)
      .encodeABI();

    const { receiptPromise } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      binanceConfig.aBNBcToken,
      { data, estimate: true },
    );

    const result = await receiptPromise;

    return !!result;
  }

  public async checkAllowance(amount: BigNumber): Promise<boolean> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const aBNBcContract = await this.getABNBCContract();
    const web3 = this.writeProvider.getWeb3();
    const { binanceConfig } = configFromEnv();

    const allowance = new BigNumber(
      await aBNBcContract.methods
        .allowance(this.writeProvider.currentAccount, binanceConfig.aBNBbToken)
        .call(),
    );
    const rawAmount = web3.utils.toWei(amount.toString());

    try {
      return allowance.isGreaterThanOrEqualTo(rawAmount);
    } catch (error) {
      throw new Error(`checkAllowance error. ${error}`);
    }
  }
}

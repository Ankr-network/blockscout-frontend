import {
  EEthereumNetworkId,
  IWeb3SendResult,
  TWeb3BatchCallback,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';
import { BlockTransactionObject } from 'web3-eth';
import { Contract, EventData, Filter } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';
import { ISwitcher, IShareArgs } from 'modules/api/switcher';
import {
  ETH_SCALE_FACTOR,
  isMainnet,
  MAX_UINT256,
  ZERO,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getFilteredContractEvents } from 'modules/common/utils/getFilteredContractEvents';
import { convertNumberToHex } from 'modules/common/utils/numbers/converters';

import {
  AVALANCHE_READ_PROVIDER_ID,
  AVAX_DECIMALS,
  AVAX_MAX_BLOCK_RANGE,
  AVAX_MAX_HISTORY_RANGE,
  AVAX_MAX_PARALLEL_REQ,
  AVAX_SCALE_FACTOR,
} from '../const';
import { TAvaxSyntToken } from '../types';

import ABI_AAVAXB from './contracts/aAVAXb.json';
import ABI_AAVAXC from './contracts/aAVAXc.json';
import ABI_AVALANCHE_POOL from './contracts/AvalanchePool.json';

/**
 * even with this multiplier, the gas estimate is two times less
 * than if we did not manage this value.
 *
 * 60%
 */
const ESTIMATE_GAS_MULTIPLIER = 1.6;

// maxAmount = userBalance - gasFee * GAS_FEE_MULTIPLIER
const GAS_FEE_MULTIPLIER = 3;

type TPastEventsData = EventData[];

export type TTxEventsHistoryGroupData = ITxEventsHistoryGroupItem[];

enum EAvalanchePoolEvents {
  AvaxClaimPending = 'AvaxClaimPendingV2',
  StakePending = 'StakePendingV2',
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

interface IPendingData {
  pendingAAVAXB: BigNumber;
  pendingAAVAXC: BigNumber;
}

export interface ITxEventsHistoryData {
  completedAAVAXB: TTxEventsHistoryGroupData;
  completedAAVAXC: TTxEventsHistoryGroupData;
  pendingAAVAXB: TTxEventsHistoryGroupData;
  pendingAAVAXC: TTxEventsHistoryGroupData;
}

interface IEventsBatch {
  stakeRawEvents: EventData[];
  unstakeRawEvents: EventData[];
  ratio: BigNumber;
}

interface ITxHistoryEventData extends EventData {
  timestamp: number;
}

export interface IGetTxData {
  amount: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
}

export class AvalancheSDK implements ISwitcher {
  private readonly readProvider: Web3KeyReadProvider;

  private readonly writeProvider: Web3KeyWriteProvider;

  private static instance?: AvalancheSDK;

  private currentAccount: string;

  private stakeGasFee?: BigNumber;

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
      avalancheConfig.aAVAXb,
    );
  }

  private async getAAVAXCTokenContract(isForceRead = false): Promise<Contract> {
    const { avalancheConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_AAVAXC as AbiItem[],
      avalancheConfig.aAVAXc,
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

  // todo: reuse it from stake/api/getTxEventsHistoryGroup
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
      EEthereumNetworkId.avalanche,
      EEthereumNetworkId.avalancheTestnet,
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

  public async addTokenToWallet(token: TAvaxSyntToken): Promise<boolean> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const { avalancheConfig } = configFromEnv();

    const aAVAXbTokenContract = await this.getAAVAXBTokenContract();
    const aAVAXcTokenContract = await this.getAAVAXCTokenContract();
    const contract =
      token === Token.aAVAXb ? aAVAXbTokenContract : aAVAXcTokenContract;

    const [symbol, rawDecimals]: [string, string] = await Promise.all([
      contract.methods.symbol().call(),
      contract.methods.decimals().call(),
    ]);

    const decimals = Number.parseInt(rawDecimals, 10);

    return this.writeProvider.addTokenToWallet({
      address:
        token === Token.aAVAXb
          ? avalancheConfig.aAVAXb
          : avalancheConfig.aAVAXc,
      symbol,
      decimals,
      chainId: isMainnet
        ? EEthereumNetworkId.avalanche
        : EEthereumNetworkId.avalancheTestnet,
    });
  }

  public async getABBalance(): Promise<BigNumber> {
    const aAVAXbTokenContract = await this.getAAVAXBTokenContract();

    const balance = await aAVAXbTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  public async getACBalance(): Promise<BigNumber> {
    const aAVAXcTokenContract = await this.getAAVAXCTokenContract();

    const balance = await aAVAXcTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  public async getACRatio(): Promise<BigNumber> {
    const aAVAXcTokenContract = await this.getAAVAXCTokenContract();
    const rawRatio = await aAVAXcTokenContract.methods.ratio().call();

    return this.convertFromWei(rawRatio);
  }

  public async getACAllowance(spender?: string): Promise<BigNumber> {
    const aAVAXcTokenContract = await this.getAAVAXCTokenContract();
    const { avalancheConfig } = configFromEnv();

    const allowance = await aAVAXcTokenContract.methods
      .allowance(
        this.writeProvider.currentAccount,
        spender || avalancheConfig.aAVAXb,
      )
      .call();

    return new BigNumber(allowance);
  }

  public async fetchTxData(txHash: string): Promise<IGetTxData> {
    const provider = await this.getProvider();

    const web3 = provider.getWeb3();

    const tx = await web3.eth.getTransaction(txHash);

    const { 0: amount } =
      tx.value === '0'
        ? web3.eth.abi.decodeParameters(['uint256'], tx.input.slice(10))
        : { 0: tx.value };

    return {
      amount: this.convertFromWei(amount),
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

  public async approveACForAB(
    amount = MAX_UINT256,
    scale = 1,
  ): Promise<IWeb3SendResult | undefined> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const hexAmount = convertNumberToHex(amount, scale);
    const isAllowed = await this.checkAllowance(hexAmount);

    if (isAllowed) {
      return undefined;
    }

    const { avalancheConfig } = configFromEnv();

    const aAVAXcTokenContract = await this.getAAVAXCTokenContract();

    const data = aAVAXcTokenContract.methods
      .approve(avalancheConfig.aAVAXb, hexAmount)
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      avalancheConfig.aAVAXc,
      { data, estimate: true },
    );
  }

  public async checkAllowance(hexAmount: string): Promise<boolean> {
    const allowance = await this.getACAllowance();

    return allowance.isGreaterThanOrEqualTo(hexAmount);
  }

  public async lockShares({ amount }: IShareArgs): Promise<IWeb3SendResult> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const aAVAXbTokenContract = await this.getAAVAXBTokenContract();
    const { avalancheConfig } = configFromEnv();

    const data = aAVAXbTokenContract.methods
      .lockShares(convertNumberToHex(amount, ETH_SCALE_FACTOR))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      avalancheConfig.aAVAXb,
      { data, estimate: true },
    );
  }

  public async unlockShares({ amount }: IShareArgs): Promise<IWeb3SendResult> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const aAVAXbTokenContract = await this.getAAVAXBTokenContract();
    const { avalancheConfig } = configFromEnv();

    const data = aAVAXbTokenContract.methods
      .unlockShares(convertNumberToHex(amount, ETH_SCALE_FACTOR))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      avalancheConfig.aAVAXb,
      { data, estimate: true },
    );
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

  private async getPoolEventsBatch(): Promise<IEventsBatch> {
    const avalanchePoolContract = await this.getAvalanchePoolContract(true);

    const [stakeRawEvents, unstakeRawEvents, ratio] = await Promise.all([
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
      this.getACRatio(),
    ]);

    return {
      stakeRawEvents,
      unstakeRawEvents,
      ratio,
    };
  }

  public async getTotalPendingUnstakes(): Promise<BigNumber> {
    const avalanchePoolContract = await this.getAvalanchePoolContract();

    const pending = await avalanchePoolContract.methods
      .pendingAvaxClaimsOf(this.currentAccount)
      .call();

    return this.convertFromWei(pending);
  }

  public async getPendingUnstakes(): Promise<IPendingData> {
    const { unstakeRawEvents, ratio } = await this.getPoolEventsBatch();
    let totalUnstakingValue = await this.getTotalPendingUnstakes();

    let pendingAAVAXB: BigNumber = ZERO;
    let pendingAAVAXC: BigNumber = ZERO;

    if (totalUnstakingValue.isGreaterThan(ZERO)) {
      const unstakePendingReverse: EventData[] = unstakeRawEvents.reverse();

      for (let i = 0; i < unstakePendingReverse.length; i += 1) {
        const unstakeEventItem = unstakePendingReverse[i];

        const itemAmount = this.convertFromWei(
          unstakeEventItem.returnValues.amount,
        );

        totalUnstakingValue = totalUnstakingValue.minus(itemAmount);

        if (unstakeEventItem.returnValues.isRebasing) {
          pendingAAVAXB = pendingAAVAXB.plus(
            this.convertFromWei(unstakeEventItem.returnValues.amount),
          );
        } else {
          pendingAAVAXC = pendingAAVAXC.plus(
            this.convertFromWei(
              unstakeEventItem.returnValues.amount,
            ).multipliedBy(ratio),
          );
        }

        if (totalUnstakingValue.isZero()) {
          break;
        }
      }
    }

    return {
      pendingAAVAXB,
      pendingAAVAXC,
    };
  }

  public async getTxEventsHistory(): Promise<ITxEventsHistoryData> {
    const { stakeRawEvents, unstakeRawEvents, ratio } =
      await this.getPoolEventsBatch();

    let totalPendingUnstakes = await this.getTotalPendingUnstakes();
    let completedRawEvents: TPastEventsData = [];
    let pendingRawEvents: TPastEventsData = [];

    if (totalPendingUnstakes.isGreaterThan(0)) {
      const unstakeRawEventsReverse: TPastEventsData =
        unstakeRawEvents.reverse();

      for (let i = 0; i < unstakeRawEventsReverse.length; i += 1) {
        const unstakeRawEventItem = unstakeRawEventsReverse[i];
        const isCert = !unstakeRawEventItem.returnValues.isRebasing;

        const itemAmount =
          isCert && !ratio.isZero()
            ? this.convertFromWei(
                unstakeRawEventItem.returnValues.amount,
              ).dividedBy(ratio)
            : this.convertFromWei(unstakeRawEventItem.returnValues.amount);

        totalPendingUnstakes = totalPendingUnstakes.minus(itemAmount);

        pendingRawEvents = [...pendingRawEvents, unstakeRawEventItem];

        if (totalPendingUnstakes.isZero()) {
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

    const {
      bondEvents: completedAAVAXBEvents,
      certEvents: completedAAVAXCEvents,
    } = getFilteredContractEvents(completedRawEvents);

    const { bondEvents: pendingAAVAXBEvents, certEvents: pendingAAVAXCEvents } =
      getFilteredContractEvents(pendingRawEvents);

    const [completedAAVAXB, completedAAVAXC, pendingAAVAXB, pendingAAVAXC] =
      await Promise.all([
        this.getTxEventsHistoryGroup(completedAAVAXBEvents),
        this.getTxEventsHistoryGroup(completedAAVAXCEvents),
        this.getTxEventsHistoryGroup(pendingAAVAXBEvents),
        this.getTxEventsHistoryGroup(pendingAAVAXCEvents),
      ]);

    return {
      completedAAVAXB,
      completedAAVAXC: completedAAVAXC.map(x => ({
        ...x,
        txAmount: x.txAmount.multipliedBy(ratio),
      })),
      pendingAAVAXB,
      pendingAAVAXC: pendingAAVAXC.map(x => ({
        ...x,
        txAmount: x.txAmount.multipliedBy(ratio),
      })),
    };
  }

  private getStakeMethodName(token: TAvaxSyntToken) {
    switch (token) {
      case Token.aAVAXc:
        return 'stakeAndClaimCerts';

      default:
        return 'stakeAndClaimBonds';
    }
  }

  public async stake(
    amount: BigNumber,
    token: TAvaxSyntToken,
  ): Promise<{ txHash: string }> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    let gasFee = this.stakeGasFee;
    if (!gasFee) {
      gasFee = await this.getStakeGasFee(amount, token);
    }

    const balance = await this.getAVAXBalance();

    // multiplication needs to avoid problems with max amount
    // and fee calculation in the wallet
    const multipliedGasFee = gasFee.multipliedBy(GAS_FEE_MULTIPLIER);
    const maxAllowedAmount = balance.minus(multipliedGasFee);

    const stakeAmount = amount.isGreaterThan(maxAllowedAmount)
      ? maxAllowedAmount
      : amount;

    const value = convertNumberToHex(stakeAmount, AVAX_SCALE_FACTOR);

    const avalanchePoolContract = await this.getAvalanchePoolContract();

    const contractStake =
      avalanchePoolContract.methods[this.getStakeMethodName(token)];

    const tx = await contractStake().send({
      from: this.currentAccount,
      value,
    });

    return { txHash: tx.transactionHash };
  }

  public async getStakeGasFee(
    amount: BigNumber,
    token: TAvaxSyntToken,
  ): Promise<BigNumber> {
    const provider = await this.getProvider();
    const avalanchePoolContract = await this.getAvalanchePoolContract();

    const contractStake =
      avalanchePoolContract.methods[this.getStakeMethodName(token)];

    const estimatedGas: number = await contractStake().estimateGas({
      from: this.currentAccount,
      value: convertNumberToHex(amount, AVAX_SCALE_FACTOR),
    });

    const increasedGasLimit = AvalancheSDK.getIncreasedGasLimit(estimatedGas);

    const stakeGasFee = await provider.getContractMethodFee(increasedGasLimit);

    this.stakeGasFee = stakeGasFee;

    return stakeGasFee;
  }

  private static getIncreasedGasLimit(gasLimit: number) {
    return Math.round(gasLimit * ESTIMATE_GAS_MULTIPLIER);
  }

  private getUnstakeMethodName(token: TAvaxSyntToken) {
    switch (token) {
      case Token.aAVAXc:
        return 'claimCerts';

      default:
        return 'claimBonds';
    }
  }

  public async unstake(
    amount: BigNumber,
    token: TAvaxSyntToken,
  ): Promise<void> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const avalanchePoolContract = await this.getAvalanchePoolContract();
    const value = this.convertToHex(amount);

    const contractUnstake =
      avalanchePoolContract.methods[this.getUnstakeMethodName(token)];

    await contractUnstake(value).send({
      from: this.currentAccount,
    });
  }
}

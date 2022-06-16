import BigNumber from 'bignumber.js';
import flatten from 'lodash/flatten';
import Web3 from 'web3';
import { TransactionReceipt } from 'web3-core';
import { BlockTransactionObject } from 'web3-eth';
import { Contract, EventData, Filter } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import {
  EEthereumNetworkId,
  IWeb3SendResult,
  TWeb3BatchCallback,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from 'provider';

import { configFromEnv } from 'modules/api/config';
import ABI_ERC20 from 'modules/api/contract/IERC20.json';
import { ApiGateway } from 'modules/api/gateway';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { ISwitcher } from 'modules/api/switcher';
import {
  ETH_NETWORK_BY_ENV,
  ETH_SCALE_FACTOR,
  MAX_UINT256,
  ZERO,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getFilteredContractEvents } from 'modules/common/utils/getFilteredContractEvents';
import { convertNumberToHex } from 'modules/common/utils/numbers/converters';

import {
  BLOCK_OFFSET,
  MAX_BLOCK_RANGE,
  POLYGON_PROVIDER_READ_ID,
} from '../const';
import { TMaticSyntToken } from '../types';

import ABI_AMATICB from './contracts/aMATICb.json';
import ABI_AMATICC from './contracts/aMATICc.json';
import ABI_POLYGON_POOL from './contracts/PolygonPoolV3.json';

export type TTxEventsHistoryGroupData = ITxEventsHistoryGroupItem[];

enum EPolygonPoolEvents {
  MaticClaimPending = 'MaticClaimPending',
  StakePendingV2 = 'StakePendingV2',
  StakeAndClaimBonds = 'stakeAndClaimBonds',
  StakeAndClaimCerts = 'stakeAndClaimCerts',
  IsRebasing = 'IsRebasing',
  TokensBurned = 'TokensBurned',
}

export enum EPolygonPoolEventsMap {
  Unstaking = 'STAKE_ACTION_UNSTAKED',
  Staking = 'STAKE_ACTION_STAKED',
}

interface IEventsBatch {
  stakeRawEvents: EventData[];
  unstakeRawEvents: EventData[];
  ratio: BigNumber;
}

interface IPendingData {
  pendingAMATICB: BigNumber;
  pendingAMATICC: BigNumber;
}

export interface IGetTxData {
  amount: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
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

export interface ITxEventsHistoryData {
  completedAMATICB: TTxEventsHistoryGroupData;
  completedAMATICC: TTxEventsHistoryGroupData;
  pendingAMATICB: TTxEventsHistoryGroupData;
  pendingAMATICC: TTxEventsHistoryGroupData;
}

interface IPolygonSDKProviders {
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

interface ILockSharesArgs {
  amount: BigNumber;
}

interface IUnlockSharesArgs {
  amount: BigNumber;
}

const ALLOWANCE_RATE = 5;

export class PolygonSDK implements ISwitcher {
  private static instance?: PolygonSDK;

  private readonly writeProvider: Web3KeyWriteProvider;

  private readonly readProvider: Web3KeyReadProvider;

  private readonly apiGateWay: ApiGateway;

  private currentAccount: string;

  private constructor({ writeProvider, readProvider }: IPolygonSDKProviders) {
    PolygonSDK.instance = this;

    const config = configFromEnv();
    this.readProvider = readProvider;
    this.writeProvider = writeProvider;
    this.currentAccount = this.writeProvider.currentAccount;
    this.apiGateWay = new ApiGateway(config.gatewayConfig);
  }

  public static async getInstance(): Promise<PolygonSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();
    const [writeProvider, readProvider] = await Promise.all([
      providerManager.getETHWriteProvider(),
      providerManager.getETHReadProvider(POLYGON_PROVIDER_READ_ID),
    ]);

    const addrHasNotBeenUpdated =
      PolygonSDK.instance?.currentAccount === writeProvider.currentAccount;
    const hasNewProvider =
      PolygonSDK.instance?.writeProvider === writeProvider &&
      PolygonSDK.instance?.readProvider === readProvider;

    if (PolygonSDK.instance && addrHasNotBeenUpdated && hasNewProvider) {
      return PolygonSDK.instance;
    }

    const instance = new PolygonSDK({ writeProvider, readProvider });
    const isEthChain = await instance.isEthNetwork(writeProvider);

    if (isEthChain && !writeProvider.isConnected()) {
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

    const isEthChain = await this.isEthNetwork(this.writeProvider);

    if (isEthChain && !this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    if (isEthChain) {
      return this.writeProvider;
    }

    return this.readProvider;
  }

  private async isEthNetwork(provider: Web3KeyWriteProvider): Promise<boolean> {
    const web3 = provider.getWeb3();
    const chainId = await web3.eth.getChainId();

    return [EEthereumNetworkId.mainnet, EEthereumNetworkId.goerli].includes(
      chainId,
    );
  }

  private async getMaticTokenContract(isForceRead = false): Promise<Contract> {
    const { contractConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_ERC20 as AbiItem[],
      contractConfig.maticToken,
    );
  }

  private static getAMATICBTokenContract(web3: Web3): Contract {
    const { contractConfig } = configFromEnv();

    return new web3.eth.Contract(
      ABI_AMATICB as AbiItem[],
      contractConfig.aMaticbToken,
    );
  }

  private static getAMATICCTokenContract(web3: Web3): Contract {
    const { contractConfig } = configFromEnv();

    return new web3.eth.Contract(
      ABI_AMATICC as AbiItem[],
      contractConfig.aMaticCToken,
    );
  }

  private async getPolygonPoolContract(isForceRead = false): Promise<Contract> {
    const { contractConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_POLYGON_POOL as AbiItem[],
      contractConfig.polygonPool,
    );
  }

  private async getAnkrTokenContract(isForceRead = false): Promise<Contract> {
    const { contractConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_ERC20 as AbiItem[],
      contractConfig.ankrContract,
    );
  }

  private getTxType(rawTxType?: string): string | null {
    switch (rawTxType) {
      case EPolygonPoolEvents.MaticClaimPending:
      case EPolygonPoolEvents.TokensBurned:
        return EPolygonPoolEventsMap.Unstaking;

      case EPolygonPoolEvents.StakePendingV2:
        return EPolygonPoolEventsMap.Staking;

      default:
        return null;
    }
  }

  private convertFromWei(amount: string): BigNumber {
    return new BigNumber(this.readProvider.getWeb3().utils.fromWei(amount));
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

  // todo: reuse it form stake/api/getTxEventsHistoryGroup
  private async getTxEventsHistoryGroup(
    rawEvents?: EventData[],
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

  public async getMaticBalance(): Promise<BigNumber> {
    const maticTokenContract = await this.getMaticTokenContract();

    const balance = await maticTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  public async getABBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const aMaticbTokenContract = PolygonSDK.getAMATICBTokenContract(web3);

    const balance = await aMaticbTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  public async getACBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const aMaticCTokenContract = PolygonSDK.getAMATICCTokenContract(web3);

    const balance = await aMaticCTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  public async getACRatio(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const aMaticCTokenContract = PolygonSDK.getAMATICCTokenContract(web3);

    const ratio = await aMaticCTokenContract.methods.ratio().call();

    return this.convertFromWei(ratio);
  }

  public async getACAllowance(spender?: string): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const aMaticCTokenContract = PolygonSDK.getAMATICCTokenContract(web3);
    const { contractConfig } = configFromEnv();

    const allowance = await aMaticCTokenContract.methods
      .allowance(
        this.writeProvider.currentAccount,
        spender || contractConfig.aMaticbToken,
      )
      .call();

    return new BigNumber(allowance);
  }

  public async approveACForAB(
    amount = MAX_UINT256,
    scale = 1,
  ): Promise<IWeb3SendResult | undefined> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const { contractConfig } = configFromEnv();
    const web3 = this.writeProvider.getWeb3();
    const aMaticCTokenContract = PolygonSDK.getAMATICCTokenContract(web3);

    const data = aMaticCTokenContract.methods
      .approve(contractConfig.aMaticbToken, convertNumberToHex(amount, scale))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.aMaticCToken,
      { data, estimate: true },
    );
  }

  public async lockShares({
    amount,
  }: ILockSharesArgs): Promise<IWeb3SendResult> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const { contractConfig } = configFromEnv();
    const web3 = this.writeProvider.getWeb3();
    const aMaticbTokenContract = PolygonSDK.getAMATICBTokenContract(web3);

    const data = aMaticbTokenContract.methods
      .lockShares(convertNumberToHex(amount, ETH_SCALE_FACTOR))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.aMaticbToken,
      { data, estimate: true },
    );
  }

  public async unlockShares({
    amount,
  }: IUnlockSharesArgs): Promise<IWeb3SendResult> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const { contractConfig } = configFromEnv();
    const web3 = this.writeProvider.getWeb3();
    const aMaticbTokenContract = PolygonSDK.getAMATICBTokenContract(web3);

    const data = aMaticbTokenContract.methods
      .unlockShares(convertNumberToHex(amount, ETH_SCALE_FACTOR))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.aMaticbToken,
      { data, estimate: true },
    );
  }

  public async getPendingClaim(): Promise<BigNumber> {
    const polygonPoolContract = await this.getPolygonPoolContract();

    const pending = await polygonPoolContract.methods
      .pendingMaticClaimsOf(this.currentAccount)
      .call();

    return this.convertFromWei(pending);
  }

  public async getPendingData(): Promise<IPendingData> {
    const { unstakeRawEvents, ratio } = await this.getPoolEventsBatch();
    let totalUnstakingValue = await this.getPendingClaim();

    let pendingRawEvents: EventData[] = [];

    let pendingAMATICB: BigNumber = ZERO;
    let pendingAMATICC: BigNumber = ZERO;

    if (totalUnstakingValue.isGreaterThan(ZERO)) {
      const unstakePendingReverse: EventData[] = unstakeRawEvents.reverse();

      for (let i = 0; i < unstakePendingReverse.length; i += 1) {
        const unstakeEventItem = unstakePendingReverse[i];
        const isCert = !unstakeEventItem.returnValues.isRebasing;

        const itemAmount = isCert
          ? this.convertFromWei(unstakeEventItem.returnValues.amount).dividedBy(
              ratio,
            )
          : this.convertFromWei(unstakeEventItem.returnValues.amount);

        totalUnstakingValue = totalUnstakingValue.minus(itemAmount);

        if (unstakeEventItem.returnValues.isRebasing) {
          pendingAMATICB = pendingAMATICB.plus(
            this.convertFromWei(unstakeEventItem.returnValues.amount),
          );
        } else {
          pendingAMATICC = pendingAMATICC.plus(
            this.convertFromWei(
              unstakeEventItem.returnValues.amount,
            ).multipliedBy(ratio),
          );
        }
        pendingRawEvents = [...pendingRawEvents, unstakeEventItem];

        if (totalUnstakingValue.isZero()) {
          break;
        }
      }
    }

    return {
      pendingAMATICB,
      pendingAMATICC,
    };
  }

  public async getMinimumStake(): Promise<BigNumber> {
    const polygonPoolContract = await this.getPolygonPoolContract();

    const minStake = await polygonPoolContract.methods.getMinimumStake().call();

    return this.convertFromWei(minStake);
  }

  private async getPoolEventsBatch(): Promise<IEventsBatch> {
    const polygonPoolContract = await this.getPolygonPoolContract(true);

    const latestBlockNumber = await this.readProvider
      .getWeb3()
      .eth.getBlockNumber();
    const startBlock = latestBlockNumber - BLOCK_OFFSET;

    const [stakeRawEvents, unstakeRawEvents, ratio] = await Promise.all([
      this.getPastEvents({
        provider: this.readProvider,
        contract: polygonPoolContract,
        eventName: EPolygonPoolEvents.StakePendingV2,
        startBlock,
        rangeStep: MAX_BLOCK_RANGE,
        filter: { staker: this.currentAccount },
      }),
      this.getPastEvents({
        provider: this.readProvider,
        contract: polygonPoolContract,
        eventName: EPolygonPoolEvents.TokensBurned,
        startBlock,
        rangeStep: MAX_BLOCK_RANGE,
        filter: { staker: this.currentAccount },
      }),
      this.getACRatio(),
    ]);

    return {
      stakeRawEvents,
      unstakeRawEvents,
      ratio,
    };
  }

  public async getTxEventsHistory(): Promise<ITxEventsHistoryData> {
    const { stakeRawEvents, unstakeRawEvents, ratio } =
      await this.getPoolEventsBatch();

    let pendingUnstakes = await this.getPendingClaim();
    let completedRawEvents: EventData[] = [];
    let pendingRawEvents: EventData[] = [];

    if (pendingUnstakes.isGreaterThan(0)) {
      const unstakeRawEventsReverse: EventData[] = unstakeRawEvents.reverse();

      for (let i = 0; i < unstakeRawEventsReverse.length; i += 1) {
        const unstakeRawEventItem = unstakeRawEventsReverse[i];
        const isCert = !unstakeRawEventItem.returnValues.isRebasing;

        const itemAmount =
          isCert && !ratio.isZero()
            ? this.convertFromWei(
                unstakeRawEventItem.returnValues.amount,
              ).dividedBy(ratio)
            : this.convertFromWei(unstakeRawEventItem.returnValues.amount);

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

    const {
      bondEvents: completedAMATICBEvents,
      certEvents: completedAMATICCEvents,
    } = getFilteredContractEvents(completedRawEvents);

    const {
      bondEvents: pendingAMATICBEvents,
      certEvents: pendingAMATICCEvents,
    } = getFilteredContractEvents(pendingRawEvents);

    const [completedAMATICB, completedAMATICC, pendingAMATICB, pendingAMATICC] =
      await Promise.all([
        this.getTxEventsHistoryGroup(completedAMATICBEvents),
        this.getTxEventsHistoryGroup(completedAMATICCEvents),
        this.getTxEventsHistoryGroup(pendingAMATICBEvents),
        this.getTxEventsHistoryGroup(pendingAMATICCEvents),
      ]);

    return {
      completedAMATICB,
      completedAMATICC: completedAMATICC.map(x => ({
        ...x,
        txAmount: x.txAmount.multipliedBy(ratio),
      })),
      pendingAMATICB,
      pendingAMATICC: pendingAMATICC.map(x => ({
        ...x,
        txAmount: x.txAmount.multipliedBy(ratio),
      })),
    };
  }

  public async fetchTxData(txHash: string): Promise<IGetTxData> {
    const provider = await this.getProvider();

    const web3 = provider.getWeb3();

    const tx = await web3.eth.getTransaction(txHash);
    const { 0: lockShares } = web3.eth.abi.decodeParameters(
      ['uint256'],
      tx.input.slice(10),
    );

    return {
      amount: new BigNumber(web3.utils.fromWei(lockShares)),
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

  private getStakeMethodName(token: TMaticSyntToken) {
    switch (token) {
      case Token.aMATICc:
        return 'stakeAndClaimCerts';
      default:
        return 'stakeAndClaimBonds';
    }
  }

  public async stake(
    amount: BigNumber,
    token: TMaticSyntToken,
  ): Promise<{ txHash: string }> {
    const { contractConfig } = configFromEnv();

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const web3 = this.writeProvider.getWeb3();
    const [polygonPoolContract, maticTokenContract] = await Promise.all([
      this.getPolygonPoolContract(),
      this.getMaticTokenContract(),
    ]);
    const rawAmount = amount.multipliedBy(1e18);
    // 0. Check current allowance
    const allowance = new BigNumber(
      await maticTokenContract.methods
        .allowance(this.currentAccount, contractConfig.polygonPool)
        .call(),
    );
    // 1. Approve MATIC token transfer to our PolygonPool contract
    if (allowance.isLessThan(rawAmount)) {
      await maticTokenContract.methods
        .approve(
          contractConfig.polygonPool,
          web3.utils.numberToHex(rawAmount.toString(10)),
        )
        .send({ from: this.currentAccount });
    }

    const contractStakeMethod =
      polygonPoolContract.methods[this.getStakeMethodName(token)];

    // 2. Do staking
    const tx2 = await contractStakeMethod(
      web3.utils.numberToHex(rawAmount.toString(10)),
    ).send({ from: this.currentAccount });

    return { txHash: tx2.transactionHash };
  }

  public async getUnstakeFee(): Promise<{
    unstakeFee: string;
    useBeforeBlock: number;
    signature: string;
  }> {
    const { status, data, statusText } = await this.apiGateWay.api.get<{
      unstakeFee: string;
      useBeforeBlock: number;
      signature: string;
    }>(`/v1alpha/polygon/unstakeFee?address=${this.currentAccount}`);

    if (status !== 200) {
      throw new Error(`Unable to fetch ethereum balance: ${statusText}`);
    }

    return {
      unstakeFee: data.unstakeFee,
      useBeforeBlock: data.useBeforeBlock,
      signature: data.signature,
    };
  }

  private getUnstakeMethodName(token: TMaticSyntToken) {
    switch (token) {
      case Token.aMATICc:
        return 'unstakeCerts';

      default:
        return 'unstakeBonds';
    }
  }

  public async unstake(
    amount: BigNumber,
    token: TMaticSyntToken,
  ): Promise<void> {
    const { contractConfig } = configFromEnv();

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const web3 = this.writeProvider.getWeb3();
    const polygonPoolContract = await this.getPolygonPoolContract();
    const ankrTokenContract = await this.getAnkrTokenContract();
    const rawAmount = amount.multipliedBy(1e18);
    // Do unstaking
    // 0. Check current allowance
    const allowance = new BigNumber(
      await ankrTokenContract.methods
        .allowance(this.currentAccount, contractConfig.polygonPool)
        .call(),
    );

    const { unstakeFee } = await this.getUnstakeFee();

    // 1. Approve payment in Ankr for unstake
    const fee = new BigNumber(unstakeFee);

    if (allowance.isLessThan(fee)) {
      await ankrTokenContract.methods
        .approve(
          contractConfig.polygonPool,
          web3.utils.numberToHex(fee.multipliedBy(ALLOWANCE_RATE).toString(10)),
        )
        .send({ from: this.currentAccount });
    }
    // 2. Call unstake method
    // Fetch fees here and make allowance one more time if required
    const { useBeforeBlock, signature } = await this.getUnstakeFee();

    const contractUnstake =
      polygonPoolContract.methods[this.getUnstakeMethodName(token)];

    await contractUnstake(
      web3.utils.numberToHex(rawAmount.toString(10)),
      web3.utils.numberToHex(fee.toString(10)),
      web3.utils.numberToHex(useBeforeBlock),
      signature,
    ).send({ from: this.currentAccount });
  }

  public async addTokenToWallet(token: TMaticSyntToken): Promise<boolean> {
    const { contractConfig } = configFromEnv();

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    return this.writeProvider.addTokenToWallet({
      address:
        token === Token.aMATICc
          ? contractConfig.aMaticCToken
          : contractConfig.aMaticbToken,
      symbol: token,
      decimals: 18,
      chainId: ETH_NETWORK_BY_ENV,
    });
  }
}

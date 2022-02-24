import BigNumber from 'bignumber.js';
import flatten from 'lodash/flatten';
import { BlockTransactionObject } from 'web3-eth';
import { Contract, EventData, Filter } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import {
  BlockchainNetworkId,
  TWeb3BatchCallback,
  Web3KeyProvider,
  Web3KeyReadProvider,
} from 'provider';

import { configFromEnv } from 'modules/api/config';
import ABI_ERC20 from 'modules/api/contract/IERC20.json';
import { ApiGateway } from 'modules/api/gateway';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { Token } from 'modules/common/types/token';
import { getAPY } from 'modules/stake/api/getAPY';

import {
  MAX_BLOCK_RANGE,
  POLYGON_PROVIDER_ID,
  POLYGON_PROVIDER_READ_ID,
  POOL_CONTRACT_START_BLOCK,
} from '../const';

import ABI_AMATICB from './contracts/aMATICb.json';
import ABI_POLYGON_POOL from './contracts/polygonPool.json';

export type TTxEventsHistoryGroupData = ITxEventsHistoryGroupItem[];

enum EPolygonPoolEvents {
  MaticClaimPending = 'MaticClaimPending',
  StakePending = 'StakePending',
}

export enum EPolygonPoolEventsMap {
  MaticClaimPending = 'STAKE_ACTION_UNSTAKED',
  StakePending = 'STAKE_ACTION_STAKED',
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
  completed: TTxEventsHistoryGroupData;
  pending: TTxEventsHistoryGroupData;
}

interface IPolygonSDKProviders {
  readProvider: Web3KeyReadProvider;
  writeProvider: Web3KeyProvider;
}

interface IGetPastEvents {
  provider: Web3KeyProvider | Web3KeyReadProvider;
  contract: Contract;
  eventName: string;
  startBlock: number;
  rangeStep: number;
  filter?: Filter;
}

const ALLOWANCE_RATE = 5;

export class PolygonSDK {
  private static instance?: PolygonSDK;

  private readonly writeProvider: Web3KeyProvider;

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
      providerManager.getProvider(POLYGON_PROVIDER_ID),
      providerManager.getReadProvider(POLYGON_PROVIDER_READ_ID),
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

    if (!isEthChain && !writeProvider.isConnected()) {
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

    const isEthChain = await this.isEthNetwork(this.writeProvider);

    if (!isEthChain && !this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    if (isEthChain) {
      return this.writeProvider;
    }

    return this.readProvider;
  }

  private async isEthNetwork(provider: Web3KeyProvider): Promise<boolean> {
    const web3 = provider.getWeb3();
    const chainId = await web3.eth.getChainId();

    return [BlockchainNetworkId.mainnet, BlockchainNetworkId.goerli].includes(
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

  private async getAMATICBTokenContract(
    isForceRead = false,
  ): Promise<Contract> {
    const { contractConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_AMATICB as AbiItem[],
      contractConfig.aMaticbToken,
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
        return EPolygonPoolEventsMap.MaticClaimPending;

      case EPolygonPoolEvents.StakePending:
        return EPolygonPoolEventsMap.StakePending;

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

  public async getAMaticbBalance(): Promise<BigNumber> {
    const aMaticbTokenContract = await this.getAMATICBTokenContract();

    const balance = await aMaticbTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  public async getAMaticbAPY(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const aMaticbTokenContract = await this.getAMATICBTokenContract();

    return getAPY({
      tokenContract: aMaticbTokenContract,
      web3: provider.getWeb3(),
      batchSize: 12,
      blocksDeep: 3000,
    });
  }

  public async getPendingClaim(): Promise<BigNumber> {
    const polygonPoolContract = await this.getPolygonPoolContract();

    const pending = await polygonPoolContract.methods
      .pendingMaticClaimsOf(this.currentAccount)
      .call();

    return this.convertFromWei(pending);
  }

  public async getMinimumStake(): Promise<BigNumber> {
    const polygonPoolContract = await this.getPolygonPoolContract();

    const minStake = await polygonPoolContract.methods.getMinimumStake().call();

    return this.convertFromWei(minStake);
  }

  public async getTxEventsHistory(): Promise<ITxEventsHistoryData> {
    const polygonPoolContract = await this.getPolygonPoolContract(true);

    const [stakeRawEvents, unstakeRawEvents] = await Promise.all([
      this.getPastEvents({
        provider: this.readProvider,
        contract: polygonPoolContract,
        eventName: EPolygonPoolEvents.StakePending,
        startBlock: POOL_CONTRACT_START_BLOCK,
        rangeStep: MAX_BLOCK_RANGE,
        filter: { staker: this.currentAccount },
      }),
      this.getPastEvents({
        provider: this.readProvider,
        contract: polygonPoolContract,
        eventName: EPolygonPoolEvents.MaticClaimPending,
        startBlock: POOL_CONTRACT_START_BLOCK,
        rangeStep: MAX_BLOCK_RANGE,
        filter: { claimer: this.currentAccount },
      }),
    ]);

    let pendingUnstakes = await this.getPendingClaim();
    let completedRawEvents: EventData[] = [];
    let pendingRawEvents: EventData[] = [];

    if (pendingUnstakes.isGreaterThan(0)) {
      const unstakeRawEventsReverse: EventData[] = unstakeRawEvents.reverse();

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

  public async stake(amount: BigNumber): Promise<{ txHash: string }> {
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
    // 2. Do staking
    const tx2 = await polygonPoolContract.methods
      .stake(web3.utils.numberToHex(rawAmount.toString(10)))
      .send({ from: this.currentAccount });

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

  public async unstake(amount: BigNumber): Promise<void> {
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

    await polygonPoolContract.methods
      .unstake(
        web3.utils.numberToHex(rawAmount.toString(10)),
        web3.utils.numberToHex(fee.toString(10)),
        web3.utils.numberToHex(useBeforeBlock),
        signature,
      )
      .send({ from: this.currentAccount });
  }

  public async addAmaticbToWallet(): Promise<void> {
    const { contractConfig } = configFromEnv();

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    await this.writeProvider.addTokenToWallet({
      address: contractConfig.aMaticbToken,
      symbol: Token.aMATICb,
      decimals: 18,
    });
  }
}

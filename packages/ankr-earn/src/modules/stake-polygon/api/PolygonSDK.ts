//import { StkrSdk } from 'modules/api';
import BigNumber from 'bignumber.js';
import { configFromEnv } from 'modules/api/config';
import ABI_ERC20 from 'modules/api/contract/IERC20.json';
import { ApiGateway } from 'modules/api/gateway';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { Token } from 'modules/common/types/token';
import Web3 from 'web3';
import { Contract, EventData } from 'web3-eth-contract';
import { POLYGON_PROVIDER_ID } from '../const';
import ABI_AMATICB from './contracts/aMATICb.json';
import ABI_POLYGON_POOL from './contracts/polygonPool.json';

export type TTxEventsHistoryGroupData = Array<ITxEventsHistoryGroupItem | void>;

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

const ALLOWANCE_RATE = 5;

export class PolygonSDK {
  private static instance?: PolygonSDK;
  private readonly maticTokenContract: Contract;
  private readonly aMaticbTokenContract: Contract;
  private readonly polygonPoolContract: Contract;
  private readonly ankrTokenContract: Contract;
  private readonly apiGateWay: ApiGateway;

  private constructor(private web3: Web3, private currentAccount: string) {
    PolygonSDK.instance = this;

    const config = configFromEnv();
    const Contract = this.web3.eth.Contract as any;
    this.maticTokenContract = new Contract(
      ABI_ERC20 as any,
      config.contractConfig.maticToken,
    );
    this.aMaticbTokenContract = new Contract(
      ABI_AMATICB as any,
      config.contractConfig.aMaticbToken,
    );
    this.polygonPoolContract = new Contract(
      ABI_POLYGON_POOL as any,
      config.contractConfig.polygonPool,
    );
    this.ankrTokenContract = new Contract(
      ABI_ERC20 as any,
      config.contractConfig.ankrContract,
    );

    this.apiGateWay = new ApiGateway(config.gatewayConfig);
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

  private getTxAmount(amount: string): BigNumber {
    return new BigNumber(this.web3.utils.fromWei(amount));
  }

  private async getTxEventsHistoryGroup(
    rawEvents?: Array<EventData | void>,
  ): Promise<TTxEventsHistoryGroupData> {
    if (!Array.isArray(rawEvents) || !rawEvents.length) {
      return [];
    }

    const rawData: Array<ITxHistoryEventData> = [];

    for (let i = 0, rawEvent: EventData; i < rawEvents.length; i++) {
      rawEvent = rawEvents[i] as EventData;

      rawData[i] = {
        ...rawEvent,
        timestamp: (await this.web3.eth.getBlock(rawEvent.blockHash, false))
          .timestamp as number,
      };
    }

    return rawData
      .sort(
        (a: ITxHistoryEventData, b: ITxHistoryEventData): number =>
          b.timestamp - a.timestamp,
      )
      .map(
        ({
          event,
          returnValues: { amount },
          timestamp,
          transactionHash,
        }: ITxHistoryEventData): ITxEventsHistoryGroupItem => ({
          txAmount: this.getTxAmount(amount),
          txDate: new Date(timestamp * 1_000),
          txHash: transactionHash,
          txType: this.getTxType(event),
        }),
      );
  }

  public static async getInstance() {
    const providerManager = ProviderManagerSingleton.getInstance();
    const provider = await providerManager.getProvider(POLYGON_PROVIDER_ID);
    const web3 = provider.getWeb3();
    const currentAccount = provider.currentAccount;
    const addrHasNotBeenUpdated =
      PolygonSDK.instance?.currentAccount === provider.currentAccount;
    const hasWeb3 = PolygonSDK.instance?.web3 === web3;

    if (PolygonSDK.instance && addrHasNotBeenUpdated && hasWeb3) {
      return PolygonSDK.instance;
    }

    return new PolygonSDK(web3, currentAccount);
  }

  public getWeb3() {
    return this.web3;
  }

  public async getMaticBalance(): Promise<BigNumber> {
    return new BigNumber(
      this.web3.utils.fromWei(
        await this.maticTokenContract?.methods
          .balanceOf(this.currentAccount)
          .call(),
      ),
    );
  }

  public async getaMaticbBalance() {
    return new BigNumber(
      this.web3.utils.fromWei(
        await this.aMaticbTokenContract?.methods
          .balanceOf(this.currentAccount)
          .call(),
      ),
    );
  }

  public async getaMaticbAPY(): Promise<BigNumber> {
    const secOneYear: BigNumber = new BigNumber(31_536_000);
    const initRatio: BigNumber = new BigNumber(1e18);
    const defaultState: BigNumber = new BigNumber(0);

    const rawEvents: Array<EventData | void> =
      await this.aMaticbTokenContract.getPastEvents('RatioUpdate', {
        fromBlock: 'earliest',
        toBlock: 'latest',
        filter: {
          newRatio: await this.aMaticbTokenContract.methods.ratio().call(),
        },
      });

    const [firstRawEvent, seventhRawEvent]: [
      EventData | void,
      EventData | void,
    ] = [rawEvents[rawEvents.length - 1], rawEvents[rawEvents.length - 7]];

    if (
      typeof firstRawEvent === 'undefined' ||
      typeof seventhRawEvent === 'undefined'
    ) {
      return defaultState;
    }

    const [firstRawData, seventhRawData]: [
      ITxHistoryEventData,
      ITxHistoryEventData,
    ] = [
      {
        ...firstRawEvent,
        timestamp: (
          await this.web3.eth.getBlock(firstRawEvent.blockHash, false)
        ).timestamp as number,
      },
      {
        ...seventhRawEvent,
        timestamp: (
          await this.web3.eth.getBlock(seventhRawEvent.blockHash, false)
        ).timestamp as number,
      },
    ];

    if (
      typeof firstRawData.timestamp === 'undefined' ||
      typeof seventhRawData.timestamp === 'undefined'
    ) {
      return defaultState;
    }

    const ratio1: BigNumber = new BigNumber(
      firstRawData.returnValues?.newRatio ?? 0,
    );
    const ratio2: BigNumber = new BigNumber(
      seventhRawData.returnValues?.newRatio ?? 0,
    );

    const timeStamp1: BigNumber = new BigNumber(firstRawData.timestamp);
    const timeStamp2: BigNumber = new BigNumber(seventhRawData.timestamp);

    // Note: ((Math.abs(ratio1 - ratio2) / Math.abs(timeStamp1 - timeStamp2)) * 'seconds in one year') / 'init ratio'
    const apyVal: BigNumber = ratio1
      .minus(ratio2)
      .abs()
      .div(timeStamp1.minus(timeStamp2).abs())
      .multipliedBy(secOneYear)
      .div(initRatio);

    return apyVal.isNaN() ? defaultState : apyVal;
  }

  public async getPendingClaim(): Promise<BigNumber> {
    return new BigNumber(
      this.web3.utils.fromWei(
        await this.polygonPoolContract.methods
          .pendingMaticClaimsOf(this.currentAccount)
          .call(),
      ),
    );
  }

  public async getMinimumStake(): Promise<BigNumber> {
    return new BigNumber(
      this.web3.utils.fromWei(
        await this.polygonPoolContract.methods.getMinimumStake().call(),
      ),
    );
  }

  public async getTxEventsHistory(): Promise<ITxEventsHistoryData> {
    const [stakeRawEvents, unstakeRawEvents]: [
      Array<EventData | void>,
      Array<EventData | void>,
    ] = await Promise.all([
      this.polygonPoolContract.getPastEvents(EPolygonPoolEvents.StakePending, {
        fromBlock: 0,
        toBlock: 'latest',
        filter: {
          staker: this.currentAccount,
        },
      }),
      this.polygonPoolContract.getPastEvents(
        EPolygonPoolEvents.MaticClaimPending,
        {
          fromBlock: 0,
          toBlock: 'latest',
          filter: {
            claimer: this.currentAccount,
          },
        },
      ),
    ]);

    let pendingClaim: BigNumber = await this.getPendingClaim(),
      pendingRawEvents: Array<EventData | void> = [],
      completedRawEvents: Array<EventData | void>;

    if (pendingClaim.isGreaterThan(0)) {
      const unstakeRawEventsReverse: Array<EventData | void> =
        unstakeRawEvents.reverse();

      for (
        let i = 0, unstakeRawEventItem: EventData, itemAmount: BigNumber;
        i < unstakeRawEventsReverse.length;
        i++
      ) {
        unstakeRawEventItem = unstakeRawEventsReverse[i] as EventData;
        itemAmount = this.getTxAmount(unstakeRawEventItem.returnValues.amount);
        pendingClaim = pendingClaim.minus(itemAmount);

        pendingRawEvents = [...pendingRawEvents, unstakeRawEventItem];

        if (pendingClaim.isZero()) {
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

    return {
      completed: await this.getTxEventsHistoryGroup(completedRawEvents),
      pending: await this.getTxEventsHistoryGroup(pendingRawEvents),
    };
  }

  public async stake(amount: BigNumber) {
    const polygonPoolAddress = configFromEnv().contractConfig.polygonPool;
    const providerManager = ProviderManagerSingleton.getInstance();
    const provider = await providerManager.getProvider(POLYGON_PROVIDER_ID);

    if (!provider.isConnected()) {
      await provider.connect();
    }
    const web3 = provider.getWeb3();
    const polygonPoolContract = this.polygonPoolContract;
    const maticTokenContract = this.maticTokenContract;
    const currentAccount = this.currentAccount;
    const rawAmount = amount.multipliedBy(1e18);
    // 0. Check current allowance
    const allowance = new BigNumber(
      await maticTokenContract.methods
        .allowance(currentAccount, polygonPoolAddress)
        .call(),
    );
    // 1. Approve MATIC token transfer to our PolygonPool contract
    if (allowance.isLessThan(rawAmount)) {
      await maticTokenContract.methods
        .approve(
          polygonPoolAddress,
          web3.utils.numberToHex(rawAmount.toString(10)),
        )
        .send({
          from: currentAccount,
        });
    }
    // 2. Do staking
    const tx2 = await polygonPoolContract.methods
      .stake(web3.utils.numberToHex(rawAmount.toString(10)))
      .send({
        from: currentAccount,
      });
    const txHash = tx2.transactionHash;

    return { txHash };
  }
  public async getUnstakeFee() {
    const providerManager = ProviderManagerSingleton.getInstance();
    const provider = await providerManager.getProvider(POLYGON_PROVIDER_ID);
    if (!provider.isConnected()) {
      await provider.connect();
    }

    const { status, data, statusText } = await this.apiGateWay.api.get<{
      unstakeFee: string;
      useBeforeBlock: number;
      signature: string;
    }>(`/v1alpha/polygon/unstakeFee?address=${this.currentAccount}`);

    if (status !== 200)
      throw new Error(`Unable to fetch ethereum balance: ${statusText}`);

    return {
      unstakeFee: data.unstakeFee,
      useBeforeBlock: data.useBeforeBlock,
      signature: data.signature,
    };
  }

  public async unstake(amount: BigNumber) {
    const polygonPoolAddress = configFromEnv().contractConfig.polygonPool;
    const providerManager = ProviderManagerSingleton.getInstance();
    const provider = await providerManager.getProvider(POLYGON_PROVIDER_ID);
    if (!provider.isConnected()) {
      await provider.connect();
    }
    const web3 = provider.getWeb3();
    const polygonPoolContract = new web3.eth.Contract(
      ABI_POLYGON_POOL as any,
      polygonPoolAddress,
    );
    const ankrTokenContract = this.ankrTokenContract;
    const [currentAccount] = await web3.eth.getAccounts();
    const rawAmount = amount.multipliedBy(1e18);
    // Do unstaking
    // 0. Check current allowance
    const allowance = new BigNumber(
      await ankrTokenContract.methods
        .allowance(currentAccount, polygonPoolAddress)
        .call(),
    );

    const { unstakeFee } = await this.getUnstakeFee();

    // 1. Approve payment in Ankr for unstake
    const fee = new BigNumber(unstakeFee);

    if (allowance.isLessThan(fee)) {
      await ankrTokenContract.methods
        .approve(
          polygonPoolAddress,
          web3.utils.numberToHex(fee.multipliedBy(ALLOWANCE_RATE).toString(10)),
        )
        .send({
          from: currentAccount,
        });
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
      .send({
        from: currentAccount,
      });
  }

  public async addAmaticbToWallet() {
    const providerManager = ProviderManagerSingleton.getInstance();
    const provider = await providerManager.getProvider(POLYGON_PROVIDER_ID);
    const amaticbContract = configFromEnv().contractConfig.aMaticbToken;

    await provider.addTokenToWallet({
      address: amaticbContract,
      symbol: Token.aMATICb,
      decimals: 18,
    });
  }
}

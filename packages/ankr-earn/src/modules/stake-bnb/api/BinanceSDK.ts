import BigNumber from 'bignumber.js';
import { flatten } from 'lodash';
import { configFromEnv, IStkrConfig } from 'modules/api/config';
import ABI_ERC20 from 'modules/api/contract/IERC20.json';
import { ApiGateway } from 'modules/api/gateway';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { ProviderManager, Web3KeyProvider } from 'provider';
import { EthereumHttpWeb3KeyProvider } from 'provider/providerManager/providers/EthereumHttpWeb3KeyProvider';
import Web3 from 'web3';
import { Contract, EventData, Filter } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import {
  BINANCE_POOL_CONTRACT_START_BLOCK,
  BINANCE_READ_PROVIDER_ID,
  BINANCE_WRITE_PROVIDER_ID,
  BNB_MAX_BLOCK_RANGE,
} from '../const';
import ABI_ABNBB from './contracts/aBNBb.json';
import ABI_BINANCE_POOL from './contracts/BinancePool.json';

type TPastEventsData = Array<EventData | void>;

export type TTxEventsHistoryGroupData = Array<ITxEventsHistoryGroupItem | void>;

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

export interface ITxEventsHistoryData {
  completed: TTxEventsHistoryGroupData;
  pending: TTxEventsHistoryGroupData;
}

export class BinanceSDK {
  private readonly aBNBbTokenContract: Contract;
  private readonly apiGateWay: ApiGateway;
  private readonly binancePoolContractRead: Contract;
  private readonly binancePoolContractWrite: Contract;
  private readonly WBNBContract: Contract;

  private static instance?: BinanceSDK;

  private constructor(
    private web3Read: Web3,
    private web3Write: Web3,
    private currentAccount: string,
  ) {
    BinanceSDK.instance = this;

    const config: IStkrConfig = configFromEnv();

    const ContractRead = this.web3Read.eth.Contract;
    const ContractWrite = this.web3Write.eth.Contract;

    this.aBNBbTokenContract = new ContractWrite(
      ABI_ABNBB as AbiItem[],
      config.binanceConfig.aBNBbToken,
    );

    this.binancePoolContractRead = new ContractRead(
      ABI_BINANCE_POOL as AbiItem[],
      config.binanceConfig.binancePool,
    );

    this.binancePoolContractWrite = new ContractWrite(
      ABI_BINANCE_POOL as AbiItem[],
      config.binanceConfig.binancePool,
    );

    this.WBNBContract = new ContractWrite(
      ABI_ERC20 as AbiItem[],
      config.binanceConfig.WBNBContract,
    );

    this.apiGateWay = new ApiGateway(config.gatewayConfig);
  }

  private async getPastEvents(
    contract: Contract,
    eventName: string,
    startBlock: number,
    filter?: Filter,
  ): Promise<TPastEventsData> {
    const latestBlockNumber: number = await this.web3Read.eth.getBlockNumber();

    let pastEventsPromises: Array<Promise<TPastEventsData> | void> = [];

    for (let i = startBlock; i < latestBlockNumber; i += BNB_MAX_BLOCK_RANGE) {
      const fromBlock: number = i;
      const toBlock: number = i + BNB_MAX_BLOCK_RANGE;

      pastEventsPromises.push(
        contract.getPastEvents(eventName, {
          fromBlock,
          toBlock,
          filter,
        }),
      );
    }

    return flatten(await Promise.all(pastEventsPromises));
  }

  private getHexAmount(amount: BigNumber): string {
    return this.web3Write.utils.numberToHex(
      amount.multipliedBy(1e18).toString(10),
    );
  }

  private getTxAmount(amount: string): BigNumber {
    return new BigNumber(this.web3Write.utils.fromWei(amount));
  }

  // todo: reuse it form stake/api/getTxEventsHistoryGroup
  private async getTxEventsHistoryGroup(
    rawEvents?: TPastEventsData,
  ): Promise<TTxEventsHistoryGroupData> {
    if (!Array.isArray(rawEvents) || !rawEvents.length) {
      return [];
    }

    const rawData: Array<ITxHistoryEventData> = [];

    for (let i = 0, rawEvent: EventData; i < rawEvents.length; i++) {
      rawEvent = rawEvents[i] as EventData;

      rawData[i] = {
        ...rawEvent,
        timestamp: (
          await this.web3Write.eth.getBlock(rawEvent.blockHash, false)
        ).timestamp as number,
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

  public async addABNBBToWallet(): Promise<void> {
    const providerManager: ProviderManager =
      ProviderManagerSingleton.getInstance();
    const providerWrite: Web3KeyProvider = await providerManager.getProvider(
      BINANCE_WRITE_PROVIDER_ID,
    );
    const aBNBbContract: string = configFromEnv().binanceConfig.aBNBbToken;

    const [symbol, rawDecimals]: [string, string] = await Promise.all([
      this.aBNBbTokenContract.methods.symbol().call(),
      this.aBNBbTokenContract.methods.decimals().call(),
    ]);

    const decimals: number = parseInt(rawDecimals, 10);

    await providerWrite.addTokenToWallet({
      address: aBNBbContract,
      symbol,
      decimals,
    });
  }

  public async getABNBBBalance(): Promise<BigNumber> {
    return new BigNumber(
      this.web3Write.utils.fromWei(
        await this.aBNBbTokenContract.methods
          .balanceOf(this.currentAccount)
          .call(),
      ),
    );
  }

  public async getBNBBalance(): Promise<BigNumber> {
    const providerManager: ProviderManager =
      ProviderManagerSingleton.getInstance();
    const providerWrite: Web3KeyProvider = await providerManager.getProvider(
      BINANCE_WRITE_PROVIDER_ID,
    );

    const [currBalance, decimals] = await Promise.all([
      this.web3Write.eth.getBalance(this.currentAccount),
      this.WBNBContract.methods.decimals().call(),
    ]);

    return providerWrite.getFormattedBalance(currBalance, decimals);
  }

  public static async getInstance(): Promise<BinanceSDK> {
    const providerManager: ProviderManager =
      ProviderManagerSingleton.getInstance();

    const providerRead: EthereumHttpWeb3KeyProvider =
      await providerManager.getReadProvider(BINANCE_READ_PROVIDER_ID);
    const providerWrite: Web3KeyProvider = await providerManager.getProvider(
      BINANCE_WRITE_PROVIDER_ID,
    );

    const web3Read: Web3 = providerRead.getWeb3();
    const web3Write: Web3 = providerWrite.getWeb3();

    const currentAccount: string = providerWrite.currentAccount;
    const addrHasNotBeenUpdated: boolean =
      BinanceSDK.instance?.currentAccount === providerWrite.currentAccount;
    const hasWeb3Write: boolean = BinanceSDK.instance?.web3Write === web3Write;

    if (BinanceSDK.instance && addrHasNotBeenUpdated && hasWeb3Write) {
      return BinanceSDK.instance;
    }

    return new BinanceSDK(web3Read, web3Write, currentAccount);
  }

  public async getMinimumStake(): Promise<BigNumber> {
    return new BigNumber(
      this.web3Write.utils.fromWei(
        await this.binancePoolContractWrite.methods.getMinimumStake().call(),
      ),
    );
  }

  public async getPendingUnstakes(): Promise<BigNumber> {
    return new BigNumber(
      this.web3Write.utils.fromWei(
        await this.binancePoolContractWrite.methods
          .pendingUnstakesOf(this.currentAccount)
          .call(),
      ),
    );
  }

  public async getRelayerFee(): Promise<BigNumber> {
    return new BigNumber(
      this.web3Write.utils.fromWei(
        await this.binancePoolContractWrite.methods.getRelayerFee().call(),
      ),
    );
  }

  public async getTxEventsHistory(): Promise<ITxEventsHistoryData> {
    const [stakeRawEvents, unstakeRawEvents]: [
      TPastEventsData,
      TPastEventsData,
    ] = await Promise.all([
      this.getPastEvents(
        this.binancePoolContractRead,
        EBinancePoolEvents.Staked,
        BINANCE_POOL_CONTRACT_START_BLOCK,
        {
          delegator: this.currentAccount,
        },
      ),
      this.getPastEvents(
        this.binancePoolContractRead,
        EBinancePoolEvents.UnstakePending,
        BINANCE_POOL_CONTRACT_START_BLOCK,
        {
          claimer: this.currentAccount,
        },
      ),
    ]);

    let pendingUnstakes: BigNumber = await this.getPendingUnstakes(),
      pendingRawEvents: TPastEventsData = [],
      completedRawEvents: TPastEventsData;

    if (pendingUnstakes.isGreaterThan(0)) {
      const unstakeRawEventsReverse: TPastEventsData =
        unstakeRawEvents.reverse();

      for (
        let i = 0, unstakeRawEventItem: EventData, itemAmount: BigNumber;
        i < unstakeRawEventsReverse.length;
        i++
      ) {
        unstakeRawEventItem = unstakeRawEventsReverse[i] as EventData;
        itemAmount = this.getTxAmount(unstakeRawEventItem.returnValues.amount);
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

    return {
      completed: await this.getTxEventsHistoryGroup(completedRawEvents),
      pending: await this.getTxEventsHistoryGroup(pendingRawEvents),
    };
  }

  public async stake(amount: BigNumber): Promise<void> {
    const providerManager: ProviderManager =
      ProviderManagerSingleton.getInstance();
    const providerWrite: Web3KeyProvider = await providerManager.getProvider(
      BINANCE_WRITE_PROVIDER_ID,
    );

    if (!providerWrite.isConnected()) {
      await providerWrite.connect();
    }

    const resultAmount: string = this.getHexAmount(amount);

    await this.binancePoolContractWrite.methods.stake().send({
      from: this.currentAccount,
      value: resultAmount,
    });
  }

  public async unstake(amount: BigNumber): Promise<void> {
    const providerManager: ProviderManager =
      ProviderManagerSingleton.getInstance();
    const providerWrite: Web3KeyProvider = await providerManager.getProvider(
      BINANCE_WRITE_PROVIDER_ID,
    );

    if (!providerWrite.isConnected()) {
      await providerWrite.connect();
    }

    const resultAmount: string = this.getHexAmount(amount);

    await this.binancePoolContractWrite.methods.unstake(resultAmount).send({
      from: this.currentAccount,
    });
  }
}

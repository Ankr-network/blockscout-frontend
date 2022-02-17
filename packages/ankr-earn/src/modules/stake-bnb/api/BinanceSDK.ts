import BigNumber from 'bignumber.js';
import flatten from 'lodash/flatten';
import range from 'lodash/range';
import { configFromEnv } from 'modules/api/config';
import ABI_ERC20 from 'modules/api/contract/IERC20.json';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { isMainnet } from 'modules/common/const';
import { getAPY } from 'modules/stake/api/getAPY';
import { Web3KeyProvider } from 'provider';
import {
  AvailableReadProviders,
  AvailableWriteProviders,
  BlockchainNetworkId,
} from 'provider/providerManager/types';
import { Web3KeyReadProvider } from 'provider/providerManager/Web3KeyReadProvider';
import { Contract, EventData, Filter } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import ABI_ABNBB from './contracts/aBNBb.json';
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

export interface ITxEventsHistoryData {
  completed: TTxEventsHistoryGroupData;
  pending: TTxEventsHistoryGroupData;
}

// Note: ~4h
const MAX_BINANCE_BLOCK_RANGE = 5_000;

// Note: ~1d * 3 = 3d
const MAX_EVENTS_BLOCK_RANGE = MAX_BINANCE_BLOCK_RANGE * 6 * 3;

interface BinanceSDKProviders {
  readProvider: Web3KeyReadProvider;
  writeProvider: Web3KeyProvider;
}

export class BinanceSDK {
  private static instance?: BinanceSDK;

  private readonly writeProvider: Web3KeyProvider;

  private readonly readProvider: Web3KeyReadProvider;

  private currentAccount: string;

  private constructor({ readProvider, writeProvider }: BinanceSDKProviders) {
    BinanceSDK.instance = this;

    this.currentAccount = writeProvider.currentAccount;
    this.writeProvider = writeProvider;
    this.readProvider = readProvider;
  }

  public static async getInstance(): Promise<BinanceSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();
    const [writeProvider, readProvider] = await Promise.all([
      providerManager.getProvider(AvailableWriteProviders.ethCompatible),
      providerManager.getReadProvider(
        isMainnet
          ? AvailableReadProviders.binanceChain
          : AvailableReadProviders.binanceChainTest,
      ),
    ]);
    const writeWeb3 = writeProvider.getWeb3();
    const readWeb3 = readProvider.getWeb3();

    const addrHasNotBeenUpdated =
      BinanceSDK.instance?.currentAccount === writeProvider.currentAccount;
    const hasWeb3 =
      BinanceSDK.instance?.writeProvider.getWeb3() === writeWeb3 ||
      BinanceSDK.instance?.readProvider.getWeb3() === readWeb3;

    if (BinanceSDK.instance && addrHasNotBeenUpdated && hasWeb3) {
      return BinanceSDK.instance;
    }

    return new BinanceSDK({
      writeProvider,
      readProvider,
    });
  }

  private async getProvider(): Promise<Web3KeyProvider | Web3KeyReadProvider> {
    const web3 = this.writeProvider.getWeb3();
    const chainId = await web3.eth.getChainId();

    const isBinanceChain = [
      BlockchainNetworkId.smartchain,
      BlockchainNetworkId.smartchainTestnet,
    ].includes(chainId);

    if (isBinanceChain) {
      return this.writeProvider;
    }

    return this.readProvider;
  }

  private getHexAmount(amount: BigNumber): string {
    return this.readProvider
      .getWeb3()
      .utils.numberToHex(amount.multipliedBy(1e18).toString(10));
  }

  private async getPastEvents(
    provider: Web3KeyProvider | Web3KeyReadProvider,
    contract: Contract,
    eventName: string,
    filter?: Filter,
  ): Promise<TPastEventsData> {
    const latestBlockNumber = await provider.getWeb3().eth.getBlockNumber();
    const rawStartLoopBlockNumber = latestBlockNumber - MAX_EVENTS_BLOCK_RANGE;
    const startLoopBlockNumber =
      rawStartLoopBlockNumber < 0 ? 0 : rawStartLoopBlockNumber;

    const blockRange = range(
      startLoopBlockNumber,
      latestBlockNumber,
      MAX_BINANCE_BLOCK_RANGE,
    );

    const pastEvents = await Promise.all(
      blockRange.map(block => {
        const toBlock = block + MAX_BINANCE_BLOCK_RANGE;

        return contract.getPastEvents(eventName, {
          fromBlock: block,
          toBlock,
          filter,
        });
      }),
    );

    return flatten(pastEvents);
  }

  private convertFromWei(amount: string): BigNumber {
    return new BigNumber(this.readProvider.getWeb3().utils.fromWei(amount));
  }

  private async getTxEventsHistoryGroup(
    rawEvents?: TPastEventsData,
  ): Promise<TTxEventsHistoryGroupData> {
    if (!Array.isArray(rawEvents) || !rawEvents.length) {
      return [];
    }

    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const blocks = await Promise.all(
      rawEvents.map(event => web3.eth.getBlock(event.blockHash, false)),
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

  private async getABNBBTokenContract(): Promise<Contract> {
    const { binanceConfig } = configFromEnv();
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_ABNBB as AbiItem[],
      binanceConfig.aBNBbToken,
    );
  }

  private async getBinancePoolContract(): Promise<Contract> {
    const { binanceConfig } = configFromEnv();
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_BINANCE_POOL as AbiItem[],
      binanceConfig.binancePool,
    );
  }

  private async getWrappedBNBContract(): Promise<Contract> {
    const { binanceConfig } = configFromEnv();
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_ERC20 as AbiItem[],
      binanceConfig.WBNBContract,
    );
  }

  public async addABNBBToWallet(): Promise<void> {
    const { binanceConfig } = configFromEnv();

    const aBNBbTokenContract = await this.getABNBBTokenContract();

    const [symbol, rawDecimals]: [string, string] = await Promise.all([
      aBNBbTokenContract.methods.symbol().call(),
      aBNBbTokenContract.methods.decimals().call(),
    ]);

    const decimals = parseInt(rawDecimals, 10);

    await this.writeProvider.addTokenToWallet({
      address: binanceConfig.aBNBbToken,
      symbol,
      decimals,
    });
  }

  public async getABNBBBalance(): Promise<BigNumber> {
    const aBNBbTokenContract = await this.getABNBBTokenContract();

    const balance = await aBNBbTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  public async getABNBBAPY(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const tokenContract = await this.getABNBBTokenContract();

    return getAPY({
      tokenContract,
      web3,
      batchSize: 12,
      blocksDeep: 3000,
      eventName: EBinancePoolEvents.RatioUpdated,
    });
  }

  public async getBNBBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const contract = await this.getWrappedBNBContract();

    const [currBalance, decimals] = await Promise.all([
      web3.eth.getBalance(this.currentAccount),
      contract.methods.decimals().call(),
    ]);

    return provider.getFormattedBalance(currBalance, decimals);
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

  public async getTxEventsHistory(): Promise<ITxEventsHistoryData> {
    const provider = await this.getProvider();
    const binancePoolContract = await this.getBinancePoolContract();

    const [stakeRawEvents, unstakeRawEvents]: [
      TPastEventsData,
      TPastEventsData,
    ] = await Promise.all([
      this.getPastEvents(
        provider,
        binancePoolContract,
        EBinancePoolEvents.Staked,
        { delegator: this.currentAccount },
      ),
      this.getPastEvents(
        provider,
        binancePoolContract,
        EBinancePoolEvents.UnstakePending,
        { claimer: this.currentAccount },
      ),
    ]);

    let pendingUnstakes = await this.getPendingUnstakes(),
      pendingRawEvents: TPastEventsData = [],
      completedRawEvents: TPastEventsData;

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

    return {
      completed: await this.getTxEventsHistoryGroup(completedRawEvents),
      pending: await this.getTxEventsHistoryGroup(pendingRawEvents),
    };
  }

  public async stake(amount: BigNumber): Promise<void> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const binancePoolContract = await this.getBinancePoolContract();

    await binancePoolContract.methods.stake().send({
      from: this.currentAccount,
      value: this.getHexAmount(amount),
    });
  }

  public async unstake(amount: BigNumber): Promise<void> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const binancePoolContract = await this.getBinancePoolContract();

    await binancePoolContract.methods.unstake(this.getHexAmount(amount)).send({
      from: this.currentAccount,
    });
  }
}

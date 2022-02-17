import BigNumber from 'bignumber.js';
import { configFromEnv } from 'modules/api/config';
import ABI_ERC20 from 'modules/api/contract/IERC20.json';
import { ApiGateway } from 'modules/api/gateway';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { isMainnet } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getAPY } from 'modules/stake/api/getAPY';
import { Web3KeyProvider } from 'provider';
import {
  AvailableReadProviders,
  AvailableWriteProviders,
  BlockchainNetworkId,
} from 'provider/providerManager/types';
import { Web3KeyReadProvider } from 'provider/providerManager/Web3KeyReadProvider';
import { AbiItem } from 'web3-utils';
import { Contract, EventData } from 'web3-eth-contract';
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

interface IPolygonSDKProviders {
  readProvider: Web3KeyReadProvider;
  writeProvider: Web3KeyProvider;
}

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

  public static async getInstance() {
    const providerManager = ProviderManagerSingleton.getInstance();
    const [writeProvider, readProvider] = await Promise.all([
      providerManager.getProvider(AvailableWriteProviders.ethCompatible),
      providerManager.getReadProvider(
        isMainnet
          ? AvailableReadProviders.ethMainnet
          : AvailableReadProviders.ethGoerli,
      ),
    ]);

    const writeWeb3 = writeProvider.getWeb3();
    const readWeb3 = readProvider.getWeb3();

    const addrHasNotBeenUpdated =
      PolygonSDK.instance?.currentAccount === writeProvider.currentAccount;
    const hasWeb3 =
      PolygonSDK.instance?.writeProvider.getWeb3() === writeWeb3 ||
      PolygonSDK.instance?.readProvider.getWeb3() === readWeb3;

    if (PolygonSDK.instance && addrHasNotBeenUpdated && hasWeb3) {
      return PolygonSDK.instance;
    }

    return new PolygonSDK({
      writeProvider,
      readProvider,
    });
  }

  private async getProvider(): Promise<Web3KeyProvider | Web3KeyReadProvider> {
    const web3 = this.writeProvider.getWeb3();
    const chainId = await web3.eth.getChainId();

    const isEthChain = [
      BlockchainNetworkId.mainnet,
      BlockchainNetworkId.goerli,
    ].includes(chainId);

    if (isEthChain) {
      return this.writeProvider;
    }

    return this.readProvider;
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

  private async getMaticTokenContract(): Promise<Contract> {
    const { contractConfig } = configFromEnv();
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_ERC20 as AbiItem[],
      contractConfig.maticToken,
    );
  }

  private async getAMATICBTokenContract(): Promise<Contract> {
    const { contractConfig } = configFromEnv();
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_AMATICB as AbiItem[],
      contractConfig.aMaticbToken,
    );
  }

  private async getPolygonPoolContract(): Promise<Contract> {
    const { contractConfig } = configFromEnv();
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_POLYGON_POOL as AbiItem[],
      contractConfig.polygonPool,
    );
  }

  private async getAnkrTokenContract(): Promise<Contract> {
    const { contractConfig } = configFromEnv();
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_ERC20 as AbiItem[],
      contractConfig.ankrContract,
    );
  }

  private convertFromWei(amount: string): BigNumber {
    return new BigNumber(this.readProvider.getWeb3().utils.fromWei(amount));
  }

  private async getTxEventsHistoryGroup(
    rawEvents?: EventData[],
  ): Promise<TTxEventsHistoryGroupData> {
    if (!Array.isArray(rawEvents) || !rawEvents.length) {
      return [];
    }

    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const blocks = await Promise.all(
      rawEvents.map(event => web3.eth.getBlock(event.blockHash, false)),
    );

    const rawData = blocks.map((block, index) => ({
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
    const contract = await this.getMaticTokenContract();
    const balance = await contract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  public async getAMATICBBalance() {
    const contract = await this.getAMATICBTokenContract();
    const balance = await contract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  public async getAMATICBAPY(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const tokenContract = await this.getAMATICBTokenContract();

    return getAPY({
      tokenContract,
      web3,
      batchSize: 12,
      blocksDeep: 3000,
    });
  }

  public async getPendingClaim(): Promise<BigNumber> {
    const contract = await this.getPolygonPoolContract();
    const pending = await contract.methods
      .pendingMaticClaimsOf(this.currentAccount)
      .call();

    return this.convertFromWei(pending);
  }

  public async getMinimumStake(): Promise<BigNumber> {
    const contract = await this.getPolygonPoolContract();
    const minStake = await contract.methods.getMinimumStake().call();

    return this.convertFromWei(minStake);
  }

  public async getTxEventsHistory(): Promise<ITxEventsHistoryData> {
    const polygonPoolContract = await this.getPolygonPoolContract();

    const [stakeRawEvents, unstakeRawEvents]: [EventData[], EventData[]] =
      await Promise.all([
        polygonPoolContract.getPastEvents(EPolygonPoolEvents.StakePending, {
          fromBlock: 0,
          toBlock: 'latest',
          filter: {
            staker: this.currentAccount,
          },
        }),
        polygonPoolContract.getPastEvents(
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

    let pendingClaim = await this.getPendingClaim();
    let pendingRawEvents: EventData[] = [];
    let completedRawEvents: EventData[];

    if (pendingClaim.isGreaterThan(0)) {
      const unstakeRawEventsReverse = unstakeRawEvents.reverse();

      for (let i = 0; i < unstakeRawEventsReverse.length; i += 1) {
        const unstakeRawEventItem = unstakeRawEventsReverse[i];
        const itemAmount = this.convertFromWei(
          unstakeRawEventItem.returnValues.amount,
        );
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
    const {
      contractConfig: { polygonPool: polygonPoolAddress },
    } = configFromEnv();

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const web3 = this.writeProvider.getWeb3();

    const polygonPoolContract = await this.getPolygonPoolContract();
    const maticTokenContract = await this.getMaticTokenContract();
    const rawAmount = amount.multipliedBy(1e18);

    // 0. Check current allowance
    const allowance = new BigNumber(
      await maticTokenContract.methods
        .allowance(this.currentAccount, polygonPoolAddress)
        .call(),
    );
    // 1. Approve MATIC token transfer to our PolygonPool contract
    if (allowance.isLessThan(rawAmount)) {
      await maticTokenContract.methods
        .approve(
          polygonPoolAddress,
          web3.utils.numberToHex(rawAmount.toString(10)),
        )
        .send({ from: this.currentAccount });
    }
    // 2. Do staking
    const tx2 = await polygonPoolContract.methods
      .stake(web3.utils.numberToHex(rawAmount.toString(10)))
      .send({ from: this.currentAccount });
    const txHash = tx2.transactionHash;

    return { txHash };
  }

  public async getUnstakeFee() {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
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
    const {
      contractConfig: { polygonPool: polygonPoolAddress },
    } = configFromEnv();

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
        .allowance(this.currentAccount, polygonPoolAddress)
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

  public async addAmaticbToWallet() {
    const { contractConfig } = configFromEnv();

    await this.writeProvider.addTokenToWallet({
      address: contractConfig.aMaticbToken,
      symbol: Token.aMATICb,
      decimals: 18,
    });
  }
}

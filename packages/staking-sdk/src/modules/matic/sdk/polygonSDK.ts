import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import {
  Address,
  EEthereumNetworkId,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';

import { configFromEnv, ProviderManagerSingleton, ZERO } from '../../common';
import ABI_AMATICC from '../../contracts/aMATICc.json';
import ABI_ERC20 from '../../contracts/IERC20.json';
import SWAP_POOL_ABI from '../../contracts/SwapPool.json';
import { IPendingData, IStakable, IStakeData, ITxEventsHistoryData } from '../../stake';
import {
  MATIC_ON_POLYGON_PROVIDER_READ_ID,
  MATIC_SCALE_FACTOR,
} from '../const';
import { IMaticSDKProviders } from '../types';

export class MaticPolygonSDK implements IStakable {
  private static instance?: MaticPolygonSDK;

  private readonly readProvider: Web3KeyReadProvider;

  private readonly writeProvider: Web3KeyWriteProvider;

  private currentAccount: Address;

  private constructor({ readProvider, writeProvider }: IMaticSDKProviders) {
    MaticPolygonSDK.instance = this;

    this.readProvider = readProvider;
    this.writeProvider = writeProvider;
    this.currentAccount = this.writeProvider.currentAccount;
  }

  private static getACTokenContract(web3: Web3): Contract {
    const { polygonConfig } = configFromEnv();

    return new web3.eth.Contract(
      ABI_AMATICC as AbiItem[],
      polygonConfig.aMATICcToken,
    );
  }

  private convertFromWei(amount: string): BigNumber {
    return new BigNumber(this.readProvider.getWeb3().utils.fromWei(amount));
  }

  private async getMaticTokenContract(isForceRead = false): Promise<Contract> {
    const { polygonConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_ERC20 as AbiItem[],
      polygonConfig.maticToken,
    );
  }

  private async getProvider(
    isForceRead = false,
  ): Promise<Web3KeyReadProvider | Web3KeyWriteProvider> {
    if (isForceRead) {
      return this.readProvider;
    }

    const isPolygonNetwork = await this.isPolygonNetwork(this.writeProvider);

    if (isPolygonNetwork && !this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    if (isPolygonNetwork) {
      return this.writeProvider;
    }

    return this.readProvider;
  }

  private async getSwapPoolContract(isForceRead = false): Promise<Contract> {
    const { polygonConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      SWAP_POOL_ABI as AbiItem[],
      polygonConfig.swapPool,
    );
  }

  private async isPolygonNetwork(
    provider: Web3KeyWriteProvider,
  ): Promise<boolean> {
    const web3 = provider.getWeb3();
    const chainId = await web3.eth.getChainId();

    return [EEthereumNetworkId.polygon, EEthereumNetworkId.mumbai].includes(
      chainId,
    );
  }

  public static async getInstance(
    args?: Partial<IMaticSDKProviders>,
  ): Promise<MaticPolygonSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();

    const [readProvider, writeProvider] = (await Promise.all([
      args?.readProvider ??
        providerManager.getETHReadProvider(MATIC_ON_POLYGON_PROVIDER_READ_ID),
      args?.writeProvider ?? providerManager.getETHWriteProvider(),
    ])) as unknown as [Web3KeyReadProvider, Web3KeyWriteProvider];

    const isOldAccount =
      MaticPolygonSDK.instance?.currentAccount === writeProvider.currentAccount;

    const isOldProvider =
      MaticPolygonSDK.instance?.readProvider === readProvider &&
      MaticPolygonSDK.instance?.writeProvider === writeProvider;

    if (
      MaticPolygonSDK.instance &&
      isOldAccount &&
      isOldProvider
    ) {
      return MaticPolygonSDK.instance;
    }

    const instance = new MaticPolygonSDK({
      readProvider,
      writeProvider,
    });

    const isPolygonNetwork = await instance.isPolygonNetwork(writeProvider);

    if (isPolygonNetwork && !writeProvider.isConnected()) {
      await writeProvider.connect();
    }

    return instance;
  }

  public async getACPoolLiquidityInMATIC(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const acTokenContract = MaticPolygonSDK.getACTokenContract(web3);
    const swapPoolContract = await this.getSwapPoolContract();

    const [acTokensPool, ratio]: [string, string] = await Promise.all([
      swapPoolContract.methods.cerosTokenAmount().call(),
      acTokenContract.methods.ratio().call(),
    ]);

    if (acTokensPool === '0') {
      return ZERO;
    }

    // Note: (acTokensPool * MATIC_SCALE_FACTOR) / ratio
    const poolLiquidityAmount = new BigNumber(acTokensPool)
      .multipliedBy(MATIC_SCALE_FACTOR)
      .dividedBy(ratio);

    return poolLiquidityAmount.isZero() || poolLiquidityAmount.isNaN()
      ? ZERO
      : poolLiquidityAmount;
  }

  public async getACRatio(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const acTokenContract = MaticPolygonSDK.getACTokenContract(web3);

    const ratio = await acTokenContract.methods.ratio().call();

    return this.convertFromWei(ratio);
  }

  public async getMaticBalance(): Promise<BigNumber> {
    const maticTokenContract = await this.getMaticTokenContract();

    const balance = await maticTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }
  
  /**
   * @note Method for interface covering only. Not applicable here
   */
  public async getMinimumStake(): Promise<BigNumber> {
    return ZERO;
  }
  
  /**
   * @note Method for interface covering only. Not applicable here
   */
  public async getPendingClaim(): Promise<BigNumber> {
    return ZERO;
  }
  
  /**
   * @note Method for interface covering only. Not applicable here
   */
  public async getPendingData(): Promise<IPendingData> {
    return {
      pendingBond: ZERO,
      pendingCertificate: ZERO,
    };
  }

  public async getStakeFee(): Promise<BigNumber> {
    const swapPoolContract = await this.getSwapPoolContract();

    const [feeMax, stakeFee]: [string, string] = await Promise.all([
      swapPoolContract.methods.FEE_MAX().call(),
      swapPoolContract.methods.stakeFee().call(),
    ]);

    return stakeFee === '0' ? ZERO : new BigNumber(stakeFee).dividedBy(feeMax);
  }

  /**
   * TODO Add implementation for this (MATIC on Polygon)
   */
  public async getTxEventsHistory(): Promise<ITxEventsHistoryData> {
    return {
      completedBond: [],
      completedCertificate: [],
      pendingBond: [],
      pendingCertificate: [],
      unstakeBond: [],
      unstakeCertificate: [],
    };
  }

  public async getUnstakeFee(): Promise<BigNumber> {
    const swapPoolContract = await this.getSwapPoolContract();

    const [feeMax, unstakeFee]: [string, string] = await Promise.all([
      swapPoolContract.methods.FEE_MAX().call(),
      swapPoolContract.methods.unstakeFee().call(),
    ]);

    return unstakeFee === '0' ? ZERO : new BigNumber(unstakeFee).dividedBy(feeMax);
  }

  /**
   * TODO Add implementation for this (MATIC on Polygon)
   */
  public async stake(): Promise<IStakeData> {
    throw new Error('Add implementation for Stake logic');
  }

  /**
   * TODO Add implementation for this (MATIC on Polygon)
   */
  public async unstake(): Promise<void> {
    throw new Error('Add implementation for Unstake logic');
  }
}

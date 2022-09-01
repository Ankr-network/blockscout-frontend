import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { TransactionReceipt } from 'web3-core';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import {
  Address,
  EEthereumNetworkId,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';

import {
  configFromEnv,
  MAX_UINT256,
  POLYGON_NETWORK_BY_ENV,
  ProviderManagerSingleton,
  ZERO,
} from '../../common';
import ABI_MATIC_BOND from '../../contracts/aMATICb.json';
import ABI_MATIC_CERT from '../../contracts/aMATICc.json';
import ABI_ERC20 from '../../contracts/IERC20.json';
import ABI_SWAP_POOL from '../../contracts/SwapPool.json';
import {
  IPendingData,
  IStakable,
  IStakeData,
  ITxEventsHistoryData,
} from '../../stake';
import { IFetchTxData } from '../../switcher';
import { convertNumberToHex } from '../../utils';
import {
  MATIC_DECIMALS,
  MATIC_ON_POLYGON_ESTIMATE_GAS_MULTIPLIER,
  MATIC_ON_POLYGON_GAS_FEE_MULTIPLIER,
  MATIC_ON_POLYGON_PROVIDER_READ_ID,
  MATIC_SCALE_FACTOR,
} from '../const';
import {
  EMaticSDKErrorCodes,
  IMaticSDKProviders,
  TMaticSyntToken,
} from '../types';

const { polygonConfig } = configFromEnv();

export class MaticPolygonSDK implements IStakable {
  private static instance?: MaticPolygonSDK;

  private readonly readProvider: Web3KeyReadProvider;

  private readonly writeProvider: Web3KeyWriteProvider;

  private currentAccount: Address;

  /**
   * stakeGasFee — cached stake gas fee.
   *
   * @type {BigNumber | undefined}
   * @private
   */
  private stakeGasFee?: BigNumber;

  private constructor({ readProvider, writeProvider }: IMaticSDKProviders) {
    MaticPolygonSDK.instance = this;

    this.readProvider = readProvider;
    this.writeProvider = writeProvider;
    this.currentAccount = this.writeProvider.currentAccount;
  }

  private static getABTokenContract(web3: Web3): Contract {
    return new web3.eth.Contract(
      ABI_MATIC_BOND as AbiItem[],
      polygonConfig.aMATICbToken,
    );
  }

  private static getACTokenContract(web3: Web3): Contract {
    return new web3.eth.Contract(
      ABI_MATIC_CERT as AbiItem[],
      polygonConfig.aMATICcToken,
    );
  }

  private convertFromWei(amount: string): BigNumber {
    return new BigNumber(this.readProvider.getWeb3().utils.fromWei(amount));
  }

  /**
   * Internal function to return increased gas limit.
   *
   * @param {number} gasLimit - initial gas limit
   * @private
   * @returns {number}
   */
  private getIncreasedGasLimit(gasLimit: number): number {
    return Math.round(gasLimit * MATIC_ON_POLYGON_ESTIMATE_GAS_MULTIPLIER);
  }

  private async getMaticTokenContract(isForceRead = false): Promise<Contract> {
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
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_SWAP_POOL as AbiItem[],
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

    if (MaticPolygonSDK.instance && isOldAccount && isOldProvider) {
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

  /**
   * Add token to wallet.
   *
   * @public
   * @note Initiates connect if writeProvider isn't connected.
   * @param {string} token - token symbol (aMATICc or aMATICb)
   * @returns {Promise<boolean>}
   */
  public async addTokenToWallet(token: string): Promise<boolean> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    return this.writeProvider.addTokenToWallet({
      address:
        token === 'aMATICc'
          ? polygonConfig.aMATICcToken
          : polygonConfig.aMATICbToken,
      chainId: POLYGON_NETWORK_BY_ENV,
      decimals: MATIC_DECIMALS,
      symbol: token,
    });
  }

  public async approveACToken(
    amount: BigNumber = MAX_UINT256,
    scale = MATIC_SCALE_FACTOR,
  ): Promise<boolean> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const acTokenContract = MaticPolygonSDK.getACTokenContract(web3);

    const amountHex = convertNumberToHex(amount, scale);

    const allowance = new BigNumber(
      await acTokenContract.methods
        .allowance(this.currentAccount, polygonConfig.swapPool)
        .call(),
    );

    if (allowance.isGreaterThanOrEqualTo(amountHex)) {
      return true;
    }

    const approve: TransactionReceipt | undefined =
      await acTokenContract.methods
        .approve(polygonConfig.swapPool, amountHex)
        .send({
          from: this.currentAccount,
        });

    return !!approve;
  }

  /**
   * Return aMATICb token balance.
   *
   * @public
   * @returns {Promise<BigNumber>} - human-readable balance
   */
  public async getABBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const abTokenContract = MaticPolygonSDK.getABTokenContract(web3);

    const balance = await abTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  /**
   * Return aMATICc token balance.
   *
   * @public
   * @returns {Promise<BigNumber>} - human-readable balance
   */
  public async getACBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const acTokenContract = MaticPolygonSDK.getACTokenContract(web3);

    const balance = await acTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  public async getACPoolLiquidity(): Promise<BigNumber> {
    const swapPoolContract = await this.getSwapPoolContract();

    const acTokensPool: string = await swapPoolContract.methods
      .cerosTokenAmount()
      .call();

    if (acTokensPool === '0') {
      return ZERO;
    }

    return this.convertFromWei(acTokensPool);
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
      .dividedBy(ratio)
      .decimalPlaces(0, BigNumber.ROUND_DOWN);

    return poolLiquidityAmount.isZero() || poolLiquidityAmount.isNaN()
      ? ZERO
      : this.convertFromWei(poolLiquidityAmount.toString(10));
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

  public async getStakeFeePct(): Promise<BigNumber> {
    const swapPoolContract = await this.getSwapPoolContract();

    const [feeMax, stakeFee]: [string, string] = await Promise.all([
      swapPoolContract.methods.FEE_MAX().call(),
      swapPoolContract.methods.stakeFee().call(),
    ]);

    return stakeFee === '0' ? ZERO : new BigNumber(stakeFee).dividedBy(feeMax);
  }

  /**
   * @note For aMATICc token only
   */
  public async getStakeGasFee(
    amount: BigNumber,
    token: TMaticSyntToken,
    scale = MATIC_SCALE_FACTOR,
  ): Promise<BigNumber> {
    const amountHex = convertNumberToHex(amount, scale);

    const [provider, swapPoolContract] = await Promise.all([
      this.getProvider(),
      this.getSwapPoolContract(),
    ]);

    const estimatedGas: number = await swapPoolContract.methods
      .swapEth(true, amountHex, this.currentAccount)
      .estimateGas({
        from: this.currentAccount,
        value: amountHex,
      });

    const increasedGasLimit = this.getIncreasedGasLimit(estimatedGas);

    const stakeGasFee = await provider.getContractMethodFee(increasedGasLimit);

    this.stakeGasFee = stakeGasFee;

    return stakeGasFee;
  }

  public async getTxData(txHash: string): Promise<IFetchTxData> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    const tx = await web3.eth.getTransaction(txHash);

    return {
      amount: new BigNumber(web3.utils.fromWei(tx.value)),
      destinationAddress: tx.from as string | undefined,
      isPending: tx.transactionIndex === null,
    };
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

  public async getTxReceipt(
    txHash: string,
  ): Promise<TransactionReceipt | null> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    const receipt = await web3.eth.getTransactionReceipt(txHash);

    return receipt as TransactionReceipt | null;
  }

  public async getUnstakeFeePct(): Promise<BigNumber> {
    const swapPoolContract = await this.getSwapPoolContract();

    const [feeMax, unstakeFee]: [string, string] = await Promise.all([
      swapPoolContract.methods.FEE_MAX().call(),
      swapPoolContract.methods.unstakeFee().call(),
    ]);

    return unstakeFee === '0'
      ? ZERO
      : new BigNumber(unstakeFee).dividedBy(feeMax);
  }

  /**
   * @note For aMATICc token only
   */
  public async stake(
    amount: BigNumber,
    token: string,
    scale = MATIC_SCALE_FACTOR,
  ): Promise<IStakeData> {
    if (amount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EMaticSDKErrorCodes.ZERO_AMOUNT);
    }

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const gasFee =
      this.stakeGasFee ??
      (await this.getStakeGasFee(amount, token as TMaticSyntToken, scale));

    const balance = await this.getMaticBalance();

    const multipliedGasFee = gasFee.multipliedBy(
      MATIC_ON_POLYGON_GAS_FEE_MULTIPLIER,
    );

    const maxAllowedAmount = balance.minus(multipliedGasFee);

    if (maxAllowedAmount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EMaticSDKErrorCodes.INSUFFICIENT_BALANCE);
    }

    const stakeAmount = amount.isGreaterThan(maxAllowedAmount)
      ? maxAllowedAmount
      : amount;

    const value = convertNumberToHex(stakeAmount, scale);

    const swapPoolContract = await this.getSwapPoolContract();

    const tx: TransactionReceipt = await swapPoolContract.methods
      .swapEth(true, value, this.currentAccount)
      .send({
        from: this.currentAccount,
        value,
      });

    return {
      txHash: tx.transactionHash,
    };
  }

  /**
   * @note For aMATICc token only. You will need "approveACToken" before that
   */
  public async unstake(
    amount: BigNumber,
    token: string,
    scale = MATIC_SCALE_FACTOR,
  ): Promise<void> {
    if (amount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EMaticSDKErrorCodes.ZERO_AMOUNT);
    }

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const amountHex = convertNumberToHex(amount, scale);

    const swapPoolContract = await this.getSwapPoolContract();

    await swapPoolContract.methods
      .swapEth(false, amountHex, this.currentAccount)
      .send({
        from: this.currentAccount,
      });
  }
}

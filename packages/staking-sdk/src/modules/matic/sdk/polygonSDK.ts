import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { TransactionReceipt } from 'web3-core';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import {
  Address,
  EEthereumNetworkId,
  IWeb3SendResult,
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

/**
 * MaticPolygonSDK allows you to interact with Polygon Liquid Staking smart contracts on the Polygon blockchain: MATIC, aMATICb, aMATICc, and SwapPool.
 *
 * For more information on Polygon Liquid Staking from Ankr, refer to the [development details](https://www.ankr.com/docs/staking/liquid-staking/matic/staking-mechanics).
 *
 * @class
 */
export class MaticPolygonSDK implements IStakable {
  /**
   * instance — SDK instance.
   *
   * @type {MaticPolygonSDK | undefined}
   * @static
   * @private
   */
  private static instance?: MaticPolygonSDK;

  /**
   * readProvider — provider which allows to read data without connecting the wallet.
   *
   * @type {Web3KeyReadProvider}
   * @private
   * @readonly
   */
  private readonly readProvider: Web3KeyReadProvider;

  /**
   * writeProvider — provider which has signer for signing transactions.
   *
   * @type {Web3KeyWriteProvider}
   * @private
   * @readonly
   */
  private readonly writeProvider: Web3KeyWriteProvider;

  /**
   * currentAccount — connected account.
   *
   * @type {Address}
   * @private
   */
  private currentAccount: Address;

  /**
   * stakeGasFee — cached stake gas fee.
   *
   * @type {BigNumber | undefined}
   * @private
   */
  private stakeGasFee?: BigNumber;

  /**
   * Private constructor. Instead, use `MaticPolygonSDK.getInstance`.
   *
   * @constructor
   * @private
   */
  private constructor({ readProvider, writeProvider }: IMaticSDKProviders) {
    MaticPolygonSDK.instance = this;

    this.readProvider = readProvider;
    this.writeProvider = writeProvider;
    this.currentAccount = this.writeProvider.currentAccount;
  }

  /**
   * Internal function to get aMATICb token contract.
   *
   * @private
   * @static
   * @param {Web3} web3 - Web3 instance
   * @returns {Contract}
   */
  private static getABTokenContract(web3: Web3): Contract {
    return new web3.eth.Contract(
      ABI_MATIC_BOND as AbiItem[],
      polygonConfig.aMATICbToken,
    );
  }

  /**
   * Internal function to get aMATICc token contract.
   *
   * @private
   * @static
   * @param {Web3} web3 - Web3 instance
   * @returns {Contract}
   */
  private static getACTokenContract(web3: Web3): Contract {
    return new web3.eth.Contract(
      ABI_MATIC_CERT as AbiItem[],
      polygonConfig.aMATICcToken,
    );
  }

  /**
   * Internal function to convert wei value to human-readable format.
   *
   * @private
   * @param {string} amount - value in wei
   * @returns {BigNumber}
   */
  private convertFromWei(amount: string): BigNumber {
    return new BigNumber(this.readProvider.getWeb3().utils.fromWei(amount));
  }

  /**
   * Internal function to return increased gas limit.
   *
   * @private
   * @param {number} gasLimit - initial gas limit
   * @returns {number}
   */
  private getIncreasedGasLimit(gasLimit: number): number {
    return Math.round(gasLimit * MATIC_ON_POLYGON_ESTIMATE_GAS_MULTIPLIER);
  }

  /**
   * Internal function to get MATIC token contract.
   *
   * @private
   * @param {boolean | undefined} [isForceRead = false] - forces to use read provider
   * @returns {Promise<Contract>}
   */
  private async getMaticTokenContract(isForceRead = false): Promise<Contract> {
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_ERC20 as AbiItem[],
      polygonConfig.maticToken,
    );
  }

  /**
   * Internal function to choose the right provider for read or write purpose.
   *
   * @private
   * @param {boolean | undefined} [isForceRead = false] - forces to use readProvider
   * @returns {Promise<Web3KeyReadProvider | Web3KeyWriteProvider>}
   */
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

  /**
   * Internal function to get SwapPool contract.
   *
   * @private
   * @param {boolean | undefined} [isForceRead = false] - forces to use readProvider
   * @returns {Promise<Contract>}
   */
  private async getSwapPoolContract(isForceRead = false): Promise<Contract> {
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_SWAP_POOL as AbiItem[],
      polygonConfig.swapPool,
    );
  }

  /**
   * Internal function to check the current network.
   *
   * @private
   * @param {Web3KeyWriteProvider} provider - current selected provider
   * @returns {Promise<boolean>}
   */
  private async isPolygonNetwork(
    provider: Web3KeyWriteProvider,
  ): Promise<boolean> {
    const web3 = provider.getWeb3();
    const chainId = await web3.eth.getChainId();

    return [EEthereumNetworkId.polygon, EEthereumNetworkId.mumbai].includes(
      chainId,
    );
  }

  /**
   * Initialization method for the SDK.
   *
   * Auto-connects writeProvider if chains are the same.
   * Initializes readProvider to support multiple chains.
   *
   * @public
   * @static
   * @param {Partial<IMaticSDKProviders> | undefined} args - user defined providers
   * @returns {Promise<MaticPolygonSDK>}
   */
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
   * @note Initiates connect if writeProvider doesn't connected.
   * @param {string} token - token symbol (aMATICb or aMATICc)
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

  /**
   * Approve aMATICc for SwapPool, i.e. allow SwapPool smart contract to access and transfer aMATICc tokens.
   *
   * @public
   * @note Initiates connect if writeProvider doesn't connected.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber | undefined} [amount = MAX_UINT256] - amount to approve
   * @param {number | undefined} [scale = MATIC_SCALE_FACTOR] - scale factor for amount
   * @returns {Promise<boolean>}
   */
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

    const txn = acTokenContract.methods.approve(
      polygonConfig.swapPool,
      amountHex,
    );

    const gasLimit: number = await txn.estimateGas({
      from: this.currentAccount,
    });

    const gasPrice = await this.writeProvider.getSafeGasPriceWei();

    const approve: TransactionReceipt | undefined = await txn.send({
      from: this.currentAccount,
      gas: this.getIncreasedGasLimit(gasLimit),
      gasPrice: gasPrice.toString(10),
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

  /**
   * Returns amount of the aMATICc token pool liquidity from SwapPool contract.
   *
   * @public
   * @returns {Promise<BigNumber>} - human-readable liquidity
   */
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

  /**
   * Returns amount of the aMATICc token pool liquidity in MATIC from SwapPool contract.
   *
   * @public
   * @returns {Promise<BigNumber>} - human-readable liquidity
   */
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

    return poolLiquidityAmount.isLessThanOrEqualTo(0) ||
      !poolLiquidityAmount.isFinite()
      ? ZERO
      : this.convertFromWei(poolLiquidityAmount.toString(10));
  }

  /**
   * Return aMATICc/MATIC ratio.
   *
   * @public
   * @returns {Promise<BigNumber>} - human-readable ratio
   */
  public async getACRatio(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const acTokenContract = MaticPolygonSDK.getACTokenContract(web3);

    const ratio = await acTokenContract.methods.ratio().call();

    return this.convertFromWei(ratio);
  }

  /**
   * Return MATIC token balance.
   *
   * @public
   * @returns {Promise<BigNumber>} - human-readable balance
   */
  public async getMaticBalance(): Promise<BigNumber> {
    const maticTokenContract = await this.getMaticTokenContract();

    const balance = await maticTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  /**
   * Returns amount of the MATIC token pool liquidity in aMATICc from SwapPool contract.
   *
   * @public
   * @returns {Promise<BigNumber>} - human-readable liquidity
   */
  public async getMATICPoolLiquidityInAC(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const acTokenContract = MaticPolygonSDK.getACTokenContract(web3);
    const swapPoolContract = await this.getSwapPoolContract();

    const [nativeTokenPool, ratio]: [string, string] = await Promise.all([
      swapPoolContract.methods.nativeTokenAmount().call(),
      acTokenContract.methods.ratio().call(),
    ]);

    if (nativeTokenPool === '0') {
      return ZERO;
    }

    // Note: (nativeTokenPool / MATIC_SCALE_FACTOR) * ratio
    const poolLiquidityAmount = new BigNumber(nativeTokenPool)
      .dividedBy(MATIC_SCALE_FACTOR)
      .multipliedBy(ratio)
      .decimalPlaces(0, BigNumber.ROUND_DOWN);

    return poolLiquidityAmount.isLessThanOrEqualTo(0) ||
      !poolLiquidityAmount.isFinite()
      ? ZERO
      : this.convertFromWei(poolLiquidityAmount.toString(10));
  }

  /**
   * Get minimum stake amount.
   *
   * @public
   * @note Method for interface covering only. Not applicable here.
   * @returns {Promise<BigNumber>} - returns zero
   */
  public async getMinimumStake(): Promise<BigNumber> {
    return ZERO;
  }

  /**
   * Get total pending unstake amount.
   *
   * @public
   * @note Method for interface covering only. Not applicable here.
   * @returns {Promise<BigNumber>} - returns zero
   */
  public async getPendingClaim(): Promise<BigNumber> {
    return ZERO;
  }

  /**
   * Get pending data for aMATICb and aMATICc.
   *
   * @public
   * @note Method for interface covering only. Not applicable here.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @returns {Promise<IPendingData>} - returns zero values
   */
  public async getPendingData(): Promise<IPendingData> {
    return {
      pendingBond: ZERO,
      pendingCertificate: ZERO,
    };
  }

  /**
   * Get stake fee in percents.
   *
   * @public
   * @returns {Promise<BigNumber>}
   */
  public async getStakeFeePct(): Promise<BigNumber> {
    const swapPoolContract = await this.getSwapPoolContract();

    const [feeMax, stakeFee]: [string, string] = await Promise.all([
      swapPoolContract.methods.FEE_MAX().call(),
      swapPoolContract.methods.stakeFee().call(),
    ]);

    return stakeFee === '0'
      ? ZERO
      : new BigNumber(stakeFee).multipliedBy(100).dividedBy(feeMax);
  }

  /**
   * Get stake gas fee.
   *
   * @public
   * @note For aMATICc token only.
   * @note Caches computed gas fee value for future computations.
   * @param {BigNumber} amount - amount to stake
   * @param {TMaticSyntToken} token - token symbol (aMATICb or aMATICc) as reserved value (not using now)
   * @param {number | undefined} [scale = MATIC_SCALE_FACTOR] - scale factor for amount
   * @returns {Promise<BigNumber>}
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

  /**
   * Get transaction data.
   *
   * @public
   * @param {string} targetTokenAddr - target token address (aMATICb or aMATICc)
   * @param {string} txHash - transaction hash
   * @returns {Promise<IFetchTxData>}
   */
  public async getTxData(txHash: string): Promise<IFetchTxData> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    const tx = await web3.eth.getTransaction(txHash);

    const { 1: amount } =
      tx.value === '0'
        ? web3.eth.abi.decodeParameters(['bool', 'uint256'], tx.input.slice(10))
        : { 1: tx.value };

    return {
      amount: new BigNumber(web3.utils.fromWei(amount)),
      destinationAddress: tx.from as string | undefined,
      isPending: tx.transactionIndex === null,
    };
  }

  /**
   * Get transaction history.
   *
   * @public
   * @note Not implemented yet.
   * @todo Add implementation for this (MATIC on Polygon).
   * @returns {Promise<ITxEventsHistoryData>} - returns empty arrays
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

  /**
   * Get transaction receipt.
   *
   * @public
   * @param {string} txHash - transaction hash
   * @returns {Promise<TransactionReceipt | null>}
   */
  public async getTxReceipt(
    txHash: string,
  ): Promise<TransactionReceipt | null> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    const receipt = await web3.eth.getTransactionReceipt(txHash);

    return receipt as TransactionReceipt | null;
  }

  /**
   * Get unstake fee in percents.
   *
   * @public
   * @returns {Promise<BigNumber>}
   */
  public async getUnstakeFeePct(): Promise<BigNumber> {
    const swapPoolContract = await this.getSwapPoolContract();

    const [feeMax, unstakeFee]: [string, string] = await Promise.all([
      swapPoolContract.methods.FEE_MAX().call(),
      swapPoolContract.methods.unstakeFee().call(),
    ]);

    return unstakeFee === '0'
      ? ZERO
      : new BigNumber(unstakeFee).multipliedBy(100).dividedBy(feeMax);
  }

  /**
   * Stake token.
   *
   * @public
   * @note For aMATICc token only.
   * @note Initiates connect if writeProvider doesn't connected.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber} amount - amount of token
   * @param {string} token - choose which token to receive (aMATICb or aMATICc)
   * @param {number | undefined} [scale = MATIC_SCALE_FACTOR] - scale factor for amount
   * @returns {Promise<IStakeData>}
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

    const contractMethod = swapPoolContract.methods.swapEth(
      true,
      value,
      this.currentAccount,
    );

    const gasPrice = await this.writeProvider.getSafeGasPriceWei();

    const gasLimit: number = await contractMethod.estimateGas({
      from: this.currentAccount,
      value,
    });

    const tx: TransactionReceipt = await contractMethod.send({
      from: this.currentAccount,
      value,
      gas: this.getIncreasedGasLimit(gasLimit),
      gasPrice: gasPrice.toString(10),
    });

    return {
      txHash: tx.transactionHash,
    };
  }

  /**
   * Unstake token.
   *
   * @public
   * @note For aMATICc token only.
   * @note You will need to call `approveACToken` before that.
   * @note Initiates connect if writeProvider doesn't connected.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber} amount - amount to unstake
   * @param {string} token - choose which token to unstake (aMATICb or aMATICc)
   * @param {number | undefined} [scale = MATIC_SCALE_FACTOR] - scale factor for amount
   * @returns {Promise<void>}
   */
  public async unstake(
    amount: BigNumber,
    token: string,
    scale = MATIC_SCALE_FACTOR,
  ): Promise<IWeb3SendResult> {
    if (amount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EMaticSDKErrorCodes.ZERO_AMOUNT);
    }

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const amountHex = convertNumberToHex(amount, scale);

    const swapPoolContract = await this.getSwapPoolContract();

    const txn = swapPoolContract.methods.swapEth(
      false,
      amountHex,
      this.currentAccount,
    );

    const gasLimit: number = await txn.estimateGas({
      from: this.currentAccount,
    });

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      polygonConfig.swapPool,
      {
        data: txn.encodeABI(),
        estimate: true,
        gasLimit: this.getIncreasedGasLimit(gasLimit).toString(),
      },
    );
  }
}

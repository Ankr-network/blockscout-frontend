import BigNumber from 'bignumber.js';
import {
  Web3KeyWriteProvider,
  Web3KeyReadProvider,
  IWeb3SendResult,
  ProviderManager,
} from '@ankr.com/provider';
import { Contract } from 'web3-eth-contract';

import {
  EBlockchain,
  IAllowanceParams,
  IDepositStablecoinToPAYGParams,
  IGetAllowanceFeeParams,
  IGetDepositStablecoinToPAYGFeeParams,
  ISetAllowanceParams,
  Web3Address,
} from '../common';
import {
  DepositTokenForUserParams,
  IThrowErrorIfDepositIsGreaterThanAllowanceParams,
  IThrowErrorIfValueIsGreaterThanBalanceParams,
  SendDepositTokenTransactionForUserParams,
} from './types';
import { IUsdcToken } from './abi/IUsdcToken';
import { IPayAsYouGoCommon } from './abi/IPayAsYouGoCommon';
import ABI_USDC_TOKEN from './abi/UsdcToken.json';
import ABI_PAY_AS_YOU_GO_COMMON from './abi/PayAsYouGoCommon.json';
import { UsdcPAYGReadContractManager } from './UsdcPAYGReadContractManager';
import {
  getBNAmountByTokenDecimals,
  getReadProviderByNetwork,
  getBNWithDecimalsFromString,
  convertNumberWithDecimalsToString,
} from '../utils';
import { GAS_LIMIT } from './const';

export const DEPOSIT_ERROR =
  'The deposit value exceeds the amount you approved for the deposit contract to withdraw from your account';

export class UsdcPAYGContractManager extends UsdcPAYGReadContractManager {
  protected readonly usdcTokenContract: Contract;

  protected readonly payAsYouGoWriteContract: Contract;

  // eslint-disable-next-line max-params
  constructor(
    protected readonly keyWriteProvider: Web3KeyWriteProvider,
    protected readonly keyReadProvider: Web3KeyReadProvider,
    public readonly tokenAddress: Web3Address, // token_contract_address
    public readonly depositContractAddress: Web3Address, // deposit_contract_address
  ) {
    super(keyReadProvider, tokenAddress, depositContractAddress);

    this.usdcTokenContract = keyWriteProvider.createContract(
      ABI_USDC_TOKEN,
      tokenAddress,
    );

    this.payAsYouGoWriteContract = keyWriteProvider.createContract(
      ABI_PAY_AS_YOU_GO_COMMON,
      depositContractAddress,
    );
  }

  public async getCurrentAccountBalance(network: EBlockchain, tokenAddress: Web3Address) {
    const { currentAccount } = this.keyWriteProvider;

    return this.getAccountBalance(currentAccount, network, tokenAddress);
  }

  private async sendAllowance({
    allowanceValue,
    tokenDecimals,
    depositContractAddress,
    tokenAddress,
  }: IAllowanceParams) {
    const { currentAccount } = this.keyWriteProvider;

    const amount = getBNAmountByTokenDecimals({
      value: allowanceValue,
      tokenDecimals,
    });

    const data = (this.usdcTokenContract.methods as IUsdcToken)
      .approve(depositContractAddress, amount.toString(10))
      .encodeABI();

    return this.keyWriteProvider.sendTransactionAsync(
      currentAccount,
      tokenAddress,
      {
        data,
        gasLimit: GAS_LIMIT,
      },
    );
  }

  public async getAllowanceFee({
    network,
    tokenAddress,
    amount,
    depositContractAddress,
    tokenDecimals,
  }: IGetAllowanceFeeParams) {
    const { currentAccount } = this.keyWriteProvider;

    const provider =
      await (new ProviderManager().getETHReadProvider(getReadProviderByNetwork(network)));

    const contract = provider.createContract(
      ABI_USDC_TOKEN,
      tokenAddress,
    );

    const gasAmount = await (contract.methods as IUsdcToken)
      .approve(
        depositContractAddress,
        convertNumberWithDecimalsToString(amount, tokenDecimals),
      )
      .estimateGas({
        from: currentAccount,
        gas: Number(GAS_LIMIT),
      });

    return this.keyReadProvider.getContractMethodFee(gasAmount);
  }

  private async sendDepositTransaction(
    depositValue: BigNumber,
    tokenAddress: Web3Address,
  ) {
    const { currentAccount } = this.keyWriteProvider;

    const data = (this.payAsYouGoWriteContract.methods as IPayAsYouGoCommon)
      .deposit(tokenAddress, depositValue.toString(10))
      .encodeABI();

    return this.keyWriteProvider.sendTransactionAsync(
      currentAccount,
      this.depositContractAddress,
      {
        data,
        gasLimit: GAS_LIMIT,
      },
    );
  }

  private async sendDepositTransactionForUser({
    tokenAddress,
    depositValue,
    targetAddress,
  }: SendDepositTokenTransactionForUserParams) {
    const { currentAccount } = this.keyWriteProvider;

    const data = (this.payAsYouGoWriteContract.methods as IPayAsYouGoCommon)
      .depositForUser(tokenAddress, depositValue.toString(10), targetAddress)
      .encodeABI();

    return this.keyWriteProvider.sendTransactionAsync(
      currentAccount,
      this.depositContractAddress,
      {
        data,
        estimate: true,
      },
    );
  }

  private async throwErrorIfValueIsGreaterThanBalance({
    amount,
    network,
    tokenAddress,
  }: IThrowErrorIfValueIsGreaterThanBalanceParams) {
    const balance = await this.getCurrentAccountBalance(network, tokenAddress);

    if (amount.isGreaterThan(new BigNumber(balance))) {
      throw new Error(`You don't have enough Usdc tokens`);
    }
  }

  private throwErrorIfValueIsLessThanZero(value: BigNumber) {
    if (value.isZero()) {
      throw new Error(`Deposit value can not be equal to 0`);
    }

    if (!value.isGreaterThan(0)) {
      throw new Error(`Deposit value should be more than 0`);
    }
  }

  private throwErrorIfDepositIsGreaterThanAllowance({
    depositValue,
    allowanceValue,
    tokenDecimals,
  }: IThrowErrorIfDepositIsGreaterThanAllowanceParams) {
    const amount = getBNWithDecimalsFromString(
      allowanceValue.toFixed(),
      tokenDecimals,
    );

    if (depositValue.isGreaterThan(allowanceValue)) {
      throw new Error(`${DEPOSIT_ERROR} (${amount})`);
    }
  }

  async setAllowance({
    allowanceValue,
    depositContractAddress,
    tokenAddress,
    network,
    tokenDecimals,
  }: ISetAllowanceParams) {
    const allowanceAmount = getBNAmountByTokenDecimals({
      value: allowanceValue,
      tokenDecimals,
    });

    this.throwErrorIfValueIsLessThanZero(allowanceAmount);
    await this.throwErrorIfValueIsGreaterThanBalance({
      amount: allowanceAmount,
      network,
      tokenAddress,
    });

    return this.sendAllowance({
      allowanceValue,
      depositContractAddress,
      tokenAddress,
      tokenDecimals,
    });
  }

  async getAllowanceValue(depositContractAddress: Web3Address) {
    const provider = this.keyWriteProvider;
    const { currentAccount } = provider;

    const allowance = await (this.usdcTokenReadContract.methods as IUsdcToken)
      .allowance(currentAccount, depositContractAddress)
      .call();

    return new BigNumber(allowance);
  }

  async depositUSDC({
    amount,
    network,
    tokenAddress,
    tokenDecimals,
    depositContractAddress,
  }: IDepositStablecoinToPAYGParams): Promise<IWeb3SendResult> {
    const allowanceValue = await this.getAllowanceValue(depositContractAddress);

    this.throwErrorIfValueIsLessThanZero(amount);
    await this.throwErrorIfValueIsGreaterThanBalance({ amount, network, tokenAddress });
    this.throwErrorIfDepositIsGreaterThanAllowance(
      {
        depositValue: amount,
        allowanceValue,
        tokenDecimals
      },
    );

    return this.sendDepositTransaction(amount, tokenAddress);
  }

  async getDepositUsdcFee({
    network,
    tokenAddress,
    amount,
    depositContractAddress,
    tokenDecimals,
  }: IGetDepositStablecoinToPAYGFeeParams) {
    const { currentAccount } = this.keyWriteProvider;

    const provider =
      await (new ProviderManager().getETHReadProvider(getReadProviderByNetwork(network)));

    const contract = provider.createContract(
      ABI_USDC_TOKEN,
      tokenAddress,
    );

    const gasAmount = await (contract.methods as IUsdcToken)
      .transfer(
        depositContractAddress,
        convertNumberWithDecimalsToString(amount, tokenDecimals),
      )
      .estimateGas({ from: currentAccount, gas: Number(GAS_LIMIT) });

    const gasPrice = await provider.getSafeGasPriceWei();

    const feeWei = gasPrice.multipliedBy(gasAmount);

    return this.keyReadProvider.getWeb3().utils.fromWei(feeWei.toString());
  }

  async depositUsdcForUser({
    depositValue,
    targetAddress,
    tokenAddress,
    tokenDecimals,
    network,
    depositContractAddress,
  }: DepositTokenForUserParams): Promise<IWeb3SendResult> {
    const allowanceValue = await this.getAllowanceValue(depositContractAddress);

    this.throwErrorIfValueIsLessThanZero(depositValue);
    await this.throwErrorIfValueIsGreaterThanBalance({
      amount: depositValue,
      network,
      tokenAddress,
    });
    this.throwErrorIfDepositIsGreaterThanAllowance({
      depositValue,
      allowanceValue,
      tokenDecimals,
    });

    return this.sendDepositTransactionForUser({
      tokenAddress,
      depositValue,
      targetAddress,
    });
  }

  async rejectAllowance(
    depositContractAddress: Web3Address,
    tokenAddress: Web3Address,
  ) {
    return this.sendAllowance({
      allowanceValue: new BigNumber(0),
      // this number of decimals is default for eth chain
      // but for 0 amount it doesn't matter, because we'll send '0' anyway
      tokenDecimals: 18,
      depositContractAddress,
      tokenAddress,
    });
  }
}

import BigNumber from 'bignumber.js';
import {
  Web3KeyWriteProvider,
  Web3KeyReadProvider,
  IWeb3SendResult,
} from '@ankr.com/provider';
import { Contract } from 'web3-eth-contract';

import { Web3Address } from '../common';
import {
  DepositTokenForUserParams,
  SendDepositTokenTransactionForUserParams,
} from './types';
import { IUsdcToken } from './abi/IUsdcToken';
import { IPayAsYouGoCommon } from './abi/IPayAsYouGoCommon';
import ABI_USDC_TOKEN from './abi/UsdcToken.json';
import ABI_PAY_AS_YOU_GO_COMMON from './abi/PayAsYouGoCommon.json';
import { UsdcPAYGReadContractManager } from './UsdcPAYGReadContractManager';
import { getBNWithDecimalsFromString } from '../utils';
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

  public async getCurrentAccountBalance() {
    const { currentAccount } = this.keyWriteProvider;

    const balance = await (this.usdcTokenContract.methods as IUsdcToken)
      .balanceOf(currentAccount)
      .call();

    return balance;
  }

  private async sendAllowance(
    allowanceValue: BigNumber,
    depositContractAddress: Web3Address,
    tokenAddress: Web3Address,
  ) {
    const { currentAccount } = this.keyWriteProvider;

    const data = (this.usdcTokenContract.methods as IUsdcToken)
      .approve(depositContractAddress, allowanceValue.toString(10))
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

  public async getAllowanceFee(
    allowanceValue: BigNumber,
    depositContractAddress: Web3Address,
  ) {
    const { currentAccount } = this.keyWriteProvider;

    const gasAmount = await (this.usdcTokenContract.methods as IUsdcToken)
      .approve(depositContractAddress, allowanceValue.toString(10))
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
      .deposit(
        tokenAddress,
        depositValue.toString(10),
      )
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
      .depositForUser(
        tokenAddress,
        depositValue.toString(10),
        targetAddress,
      )
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

  private async throwErrorIfValueIsGreaterThanBalance(
    value: BigNumber,
  ) {
    const balance = await this.getCurrentAccountBalance();

    if (value.isGreaterThan(new BigNumber(balance))) {
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

  private throwErrorIfDepositIsGreaterThanAllowance(
    deposit: BigNumber,
    allowance: BigNumber,
    tokenDecimals: number,
  ) {
    const amount = getBNWithDecimalsFromString(allowance.toFixed(), tokenDecimals);

    if (deposit.isGreaterThan(allowance)) {
      throw new Error(`${DEPOSIT_ERROR} (${amount})`);
    }
  }

  // eslint-disable-next-line max-params
  async setAllowance(
    amount: BigNumber,
    depositContractAddress: Web3Address,
    tokenAddress: Web3Address,
    tokenDecimals: number,
  ) {
    this.throwErrorIfValueIsLessThanZero(amount);
    await this.throwErrorIfValueIsGreaterThanBalance(amount);

    return this.sendAllowance(
      amount.multipliedBy(new BigNumber(10).pow(tokenDecimals)),
      depositContractAddress,
      tokenAddress,
    );
  }

  async getAllowanceValue(depositContractAddress: Web3Address) {
    const provider = this.keyWriteProvider;
    const { currentAccount } = provider;

    const allowance = await (this.usdcTokenReadContract.methods as IUsdcToken)
      .allowance(currentAccount, depositContractAddress)
      .call();

    return new BigNumber(allowance);
  }

  async depositUSDC(
    depositValue: BigNumber,
    tokenAddress: Web3Address,
    tokenDecimals: number,
    depositContractAddress: Web3Address,
  ): Promise<IWeb3SendResult> {
    const allowanceValue = await this.getAllowanceValue(
      depositContractAddress,
    );

    this.throwErrorIfValueIsLessThanZero(depositValue);
    await this.throwErrorIfValueIsGreaterThanBalance(
      depositValue,
    );
    this.throwErrorIfDepositIsGreaterThanAllowance(
      depositValue,
      allowanceValue,
      tokenDecimals,
    );

    return this.sendDepositTransaction(
      depositValue,
      tokenAddress,
    );
  }

  async getDepositUsdcFee(
    depositValue: BigNumber,
    depositContractAddress: Web3Address,
  ) {
    const { currentAccount } = this.keyWriteProvider;

    const gasAmount = await (this.usdcTokenContract.methods as IUsdcToken)
      .transfer(depositContractAddress, depositValue.toString(10))
      .estimateGas({ from: currentAccount, gas: Number(GAS_LIMIT) });

    const gasPrice = await this.keyWriteProvider.getSafeGasPriceWei();

    const feeWei = gasPrice.multipliedBy(gasAmount);

    return this.keyReadProvider.getWeb3().utils.fromWei(feeWei.toString());
  }

  async depositUsdcForUser({
    depositValue,
    targetAddress,
    tokenAddress,
    tokenDecimals,
    depositContractAddress,
  }: DepositTokenForUserParams): Promise<IWeb3SendResult> {
    const allowanceValue = await this.getAllowanceValue(
      depositContractAddress
    );

    this.throwErrorIfValueIsLessThanZero(depositValue);
    await this.throwErrorIfValueIsGreaterThanBalance(
      depositValue,
    );
    this.throwErrorIfDepositIsGreaterThanAllowance(
      depositValue,
      allowanceValue,
      tokenDecimals,
    );

    return this.sendDepositTransactionForUser({
      tokenAddress,
      depositValue,
      targetAddress,
    });
  }

  async rejectAllowance(
    depositContractAddress: Web3Address,
    payAsYouGoContractAddress: Web3Address,
  ) {
    return this.sendAllowance(
      new BigNumber(0),
      depositContractAddress,
      payAsYouGoContractAddress,
    );
  }
}

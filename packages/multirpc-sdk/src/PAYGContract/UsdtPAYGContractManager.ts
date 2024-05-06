import BigNumber from 'bignumber.js';
import {
  Web3KeyWriteProvider,
  IWeb3SendResult,
  Web3KeyReadProvider,
} from '@ankr.com/provider';
import { Contract } from 'web3-eth-contract';

import { Web3Address } from '../common';
import {
  DepositTokenForUserParams,
  SendDepositTokenTransactionForUserParams,
} from './types';
import { IUsdtToken } from './abi/IUsdtToken';
import { IPayAsYouGoCommon } from './abi/IPayAsYouGoCommon';
import ABI_USDT_TOKEN from './abi/UsdtToken.json';
import ABI_PAY_AS_YOU_GO_COMMON from './abi/PayAsYouGoCommon.json';
import { UsdtPAYGReadContractManager } from './UsdtPAYGReadContractManager';
import { getBNWithDecimalsFromString } from '../utils';
import { GAS_LIMIT } from './const';

export const DEPOSIT_ERROR =
  'The deposit value exceeds the amount you approved for the deposit contract to withdraw from your account';
const ZERO_STRING = '0';

export class UsdtPAYGContractManager extends UsdtPAYGReadContractManager {
  protected readonly usdtTokenContract: Contract;

  protected readonly depositWriteContract: Contract;

  // eslint-disable-next-line max-params
  constructor(
    protected readonly keyWriteProvider: Web3KeyWriteProvider,
    protected readonly keyReadProvider: Web3KeyReadProvider,
    public readonly tokenAddress: Web3Address, // token_contract_address
    public readonly depositContractAddress: Web3Address, // deposit_contract_address
  ) {
    super(keyReadProvider, tokenAddress, depositContractAddress);

    this.usdtTokenContract = keyWriteProvider.createContract(
      ABI_USDT_TOKEN,
      tokenAddress,
    );

    this.depositWriteContract = keyWriteProvider.createContract(
      ABI_PAY_AS_YOU_GO_COMMON,
      depositContractAddress,
    );
  }

  public async getCurrentAccountBalance() {
    const { currentAccount } = this.keyWriteProvider;

    const balance = await (this.usdtTokenContract.methods as IUsdtToken)
      .balanceOf(currentAccount)
      .call();

    return balance;
  }

  private async sendAllowance(
    allowanceValue: BigNumber,
    tokenDecimals: number,
    depositContractAddress: Web3Address,
    tokenAddress: Web3Address,
  ) {
    const { currentAccount } = this.keyWriteProvider;
    const amount = allowanceValue.multipliedBy(new BigNumber(10).pow(tokenDecimals))
    const data = (this.usdtTokenContract.methods as IUsdtToken)
      .approve(depositContractAddress, amount.toString(10))
      .encodeABI();

    return this.keyWriteProvider.sendTransactionAsync(
      currentAccount,
      tokenAddress,
      {
        data,
        estimate: true,
        estimateFee: true,
      },
    );
  }

  public async getAllowanceFee(
    allowanceValue: BigNumber,
    depositContractAddress: Web3Address,
  ) {
    const { currentAccount } = this.keyWriteProvider;

    let gasAmount = 0;

    // we add here this structure to avoid an error
    // when requesting gas fee for approve tx
    // if user already have any approved amount
    // p.s. this is the specifics of USDT smart contract
    try {
      gasAmount = await (this.usdtTokenContract.methods as IUsdtToken)
        .approve(depositContractAddress, allowanceValue.toString(10))
        .estimateGas({
          from: currentAccount,
          gas: Number(GAS_LIMIT),
        });
    } catch {
      gasAmount = await (this.usdtTokenContract.methods as IUsdtToken)
        .approve(depositContractAddress, ZERO_STRING)
        .estimateGas({
          from: currentAccount,
          gas: Number(GAS_LIMIT),
        });
    }

    return this.keyReadProvider.getContractMethodFee(gasAmount);
  }

  // eslint-disable-next-line max-params
  private async sendDepositTransaction(
    depositValue: BigNumber,
    tokenAddress: Web3Address,
  ) {
    const { currentAccount } = this.keyWriteProvider;

    const data = (this.depositWriteContract.methods as IPayAsYouGoCommon)
      .deposit(
        tokenAddress,
        depositValue.toFixed(),
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

    const data = (this.depositWriteContract.methods as IPayAsYouGoCommon)
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

  private async throwErrorIfValueIsGreaterThanBalance(value: BigNumber) {
    const balance = await this.getCurrentAccountBalance();

    if (value.isGreaterThan(new BigNumber(balance))) {
      throw new Error(`You don't have enough Usdt tokens`);
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
      amount,
      tokenDecimals,
      depositContractAddress,
      tokenAddress,
    );
  }

  async getAllowanceValue(depositContractAddress: Web3Address) {
    const provider = this.keyWriteProvider;
    const { currentAccount } = provider;

    const allowance = await (this.usdtTokenContract.methods as IUsdtToken)
      .allowance(currentAccount, depositContractAddress)
      .call();

    return new BigNumber(allowance);
  }

  // eslint-disable-next-line max-params
  async depositUSDT(
    depositValue: BigNumber,
    tokenAddress: Web3Address,
    tokenDecimals: number,
    depositContractAddress: Web3Address,
  ): Promise<IWeb3SendResult> {
    const allowanceValue = await this.getAllowanceValue(
      depositContractAddress,
    );

    this.throwErrorIfValueIsLessThanZero(depositValue);
    await this.throwErrorIfValueIsGreaterThanBalance(depositValue);
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

  async getDepositUsdtFee(
    depositValue: BigNumber,
    depositContractAddress: Web3Address,
  ) {
    const { currentAccount } = this.keyWriteProvider;

    let gasAmount = 0;

    // we add here this structure to avoid an error
    // when requesting gas fee for deposit tx
    // if user don't have enough allowance or tokens
    // p.s. this is the specifics of USDT smart contract
    try {
      gasAmount = await (this.usdtTokenContract.methods as IUsdtToken)
        .transfer(depositContractAddress, depositValue.toString(10))
        .estimateGas({ from: currentAccount, gas: Number(GAS_LIMIT) });
    } catch (e) {
      gasAmount = await (this.usdtTokenContract.methods as IUsdtToken)
        .transfer(depositContractAddress, ZERO_STRING)
        .estimateGas({ from: currentAccount, gas: Number(GAS_LIMIT) });
    }

    const gasPrice = await this.keyWriteProvider.getSafeGasPriceWei();

    const feeWei = gasPrice.multipliedBy(gasAmount);

    return this.keyReadProvider.getWeb3().utils.fromWei(feeWei.toString());
  }

  async depositUsdtForUser({
    depositValue,
    targetAddress,
    tokenAddress,
    depositContractAddress,
    tokenDecimals,
  }: DepositTokenForUserParams): Promise<IWeb3SendResult> {

    const allowanceValue = await this.getAllowanceValue(
      depositContractAddress,
    );

    this.throwErrorIfValueIsLessThanZero(depositValue);
    await this.throwErrorIfValueIsGreaterThanBalance(depositValue);
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
    tokenAddress: Web3Address,
  ) {
    return this.sendAllowance(
      new BigNumber(0),
      // this number of decimals is default for eth chain
      // but for 0 amount it doesn't matter, because we'll send '0' anyway
      18,
      depositContractAddress,
      tokenAddress,
    );
  }
}

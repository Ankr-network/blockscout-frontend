import BigNumber from 'bignumber.js';
import {
  Web3KeyWriteProvider,
  IWeb3SendResult,
  Web3KeyReadProvider,
} from '@ankr.com/provider';
import { Contract } from 'web3-eth-contract';

import { base64ToPrefixedHex } from '../common';
import {
  DepositAnkrForUserParams,
  IAnkrPAYGContractManagerConfig,
  SendDepositTransactionForUserParams,
} from './types';
import { IAnkrToken } from './abi/IAnkrToken';
import { IPayAsYouGo } from './abi/IPayAsYouGo';
import ABI_ANKR_TOKEN from './abi/AnkrToken.json';
import ABI_PAY_AS_YOU_GO from './abi/PayAsYouGo.json';
import { PAYGReadContractManager } from './PAYGReadContractManager';
import { formatFromWei, roundDecimals } from '../utils';
import { DEPOSIT_EXPIRATION, GAS_LIMIT } from './const';

export const DEPOSIT_ERROR =
  'The deposit value exceeds the amount you approved for the deposit contract to withdraw from your account';

export class PAYGContractManager extends PAYGReadContractManager {
  protected readonly ankrTokenContract: Contract;

  protected readonly payAsYouGoWriteContract: Contract;

  constructor(
    protected readonly keyWriteProvider: Web3KeyWriteProvider,
    protected readonly keyReadProvider: Web3KeyReadProvider,
    protected readonly config: IAnkrPAYGContractManagerConfig,
  ) {
    super(keyReadProvider, config);

    this.ankrTokenContract = keyWriteProvider.createContract(
      ABI_ANKR_TOKEN,
      config.payAsYouGoAnkrTokenContractAddress,
    );

    this.payAsYouGoWriteContract = keyWriteProvider.createContract(
      ABI_PAY_AS_YOU_GO,
      config.payAsYouGoContractAddress,
    );
  }

  public async getCurrentAccountBalance() {
    const { currentAccount } = this.keyWriteProvider;

    return (this.ankrTokenReadContract.methods as IAnkrToken)
      .balanceOf(currentAccount)
      .call();
  }

  private async sendAllowance(allowanceValue: BigNumber) {
    const { currentAccount } = this.keyWriteProvider;

    const data = (this.ankrTokenContract.methods as IAnkrToken)
      .approve(
        this.config.payAsYouGoContractAddress,
        allowanceValue.toString(10),
      )
      .encodeABI();

    return this.keyWriteProvider.sendTransactionAsync(
      currentAccount,
      this.config.payAsYouGoAnkrTokenContractAddress,
      {
        data,
        gasLimit: GAS_LIMIT,
      },
    );
  }

  public async getAllowanceFee(allowanceValue: BigNumber) {
    const { currentAccount } = this.keyWriteProvider;

    const gasAmount = await (this.ankrTokenContract.methods as IAnkrToken)
      .approve(
        this.config.payAsYouGoContractAddress,
        allowanceValue.toString(10),
      )
      .estimateGas({ from: currentAccount, gas: Number(GAS_LIMIT) });

    const gasPrice = await this.keyWriteProvider.getSafeGasPriceWei();

    const feeWei = gasPrice.multipliedBy(gasAmount);

    return this.keyReadProvider.getWeb3().utils.fromWei(feeWei.toString());
  }

  private async sendDepositTransaction(
    depositValue: BigNumber,
    publicKey: string,
    expiresAfter: string,
  ) {
    const { currentAccount } = this.keyWriteProvider;

    const data = (this.payAsYouGoWriteContract.methods as IPayAsYouGo)
      .deposit(
        depositValue.toString(10),
        expiresAfter,
        base64ToPrefixedHex(publicKey),
      )
      .encodeABI();

    return this.keyWriteProvider.sendTransactionAsync(
      currentAccount,
      this.config.payAsYouGoContractAddress,
      {
        data,
        gasLimit: GAS_LIMIT,
      },
    );
  }

  private async sendDepositTransactionForUser({
    depositValue,
    publicKey,
    targetAddress,
    expiresAfter,
  }: SendDepositTransactionForUserParams) {
    const { currentAccount } = this.keyWriteProvider;

    const data = (this.payAsYouGoWriteContract.methods as IPayAsYouGo)
      .depositForUser(
        depositValue.toString(10),
        expiresAfter,
        targetAddress,
        base64ToPrefixedHex(publicKey),
      )
      .encodeABI();

    return this.keyWriteProvider.sendTransactionAsync(
      currentAccount,
      this.config.payAsYouGoContractAddress,
      {
        data,
        estimate: true,
      },
    );
  }

  private async throwErrorIfValueIsGreaterThanBalance(value: BigNumber) {
    const balance = await this.getCurrentAccountBalance();

    if (value.isGreaterThan(new BigNumber(balance))) {
      throw new Error(`You don't have enough Ankr tokens`);
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
  ) {
    if (deposit.isGreaterThan(allowance)) {
      throw new Error(`${DEPOSIT_ERROR} (${formatFromWei(allowance)})`);
    }
  }

  async setAllowance(amount: BigNumber) {
    this.throwErrorIfValueIsLessThanZero(amount);
    await this.throwErrorIfValueIsGreaterThanBalance(amount);

    return this.sendAllowance(amount);
  }

  async getAllowanceValue() {
    const provider = this.keyWriteProvider;
    const { currentAccount } = provider;

    const allowance = await (this.ankrTokenReadContract.methods as IAnkrToken)
      .allowance(currentAccount, this.config.payAsYouGoContractAddress)
      .call();

    return new BigNumber(allowance);
  }

  async depositAnkr(
    depositValue: BigNumber,
    publicKey: string,
    expiresAfter = DEPOSIT_EXPIRATION,
  ): Promise<IWeb3SendResult> {
    const allowanceValue = await this.getAllowanceValue();

    this.throwErrorIfValueIsLessThanZero(depositValue);
    await this.throwErrorIfValueIsGreaterThanBalance(depositValue);
    this.throwErrorIfDepositIsGreaterThanAllowance(
      depositValue,
      allowanceValue,
    );

    return this.sendDepositTransaction(
      roundDecimals(depositValue),
      publicKey,
      expiresAfter,
    );
  }

  async getDepositAnkrFee(depositValue: BigNumber) {
    const { currentAccount } = this.keyWriteProvider;

    const gasAmount = await (this.ankrTokenContract.methods as IAnkrToken)
      .transfer(
        this.config.payAsYouGoContractAddress,
        roundDecimals(depositValue).toString(10),
      )
      .estimateGas({ from: currentAccount, gas: Number(GAS_LIMIT) });

    const gasPrice = await this.keyWriteProvider.getSafeGasPriceWei();

    const feeWei = gasPrice.multipliedBy(gasAmount);

    return this.keyReadProvider.getWeb3().utils.fromWei(feeWei.toString());
  }

  async depositAnkrForUser({
    depositValue,
    publicKey,
    targetAddress,
    expiresAfter = DEPOSIT_EXPIRATION,
  }: DepositAnkrForUserParams): Promise<IWeb3SendResult> {
    const allowanceValue = await this.getAllowanceValue();

    this.throwErrorIfValueIsLessThanZero(depositValue);
    await this.throwErrorIfValueIsGreaterThanBalance(depositValue);
    this.throwErrorIfDepositIsGreaterThanAllowance(
      depositValue,
      allowanceValue,
    );

    return this.sendDepositTransactionForUser({
      depositValue: roundDecimals(depositValue),
      publicKey,
      targetAddress,
      expiresAfter,
    });
  }

  async rejectAllowance() {
    return this.sendAllowance(new BigNumber(0));
  }
}

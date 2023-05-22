import BigNumber from 'bignumber.js';
import { Web3KeyWriteProvider, IWeb3SendResult } from '@ankr.com/provider';

import { base64ToPrefixedHex } from '../common';
import { IPAYGContractManagerConfig } from './types';
import { IAnkrToken } from './abi/IAnkrToken';
import { IPayAsYouGo } from './abi/IPayAsYouGo';
import { PAYGReadContractManager } from './PAYGReadContractManager';
import { formatFromWei, roundDecimals } from '../utils/roundDecimals';

const GAS_LIMIT = '200000';
const DEPOSIT_EXPIRATION = '31536000';
export const DEPOSIT_ERROR =
  'The deposit value exceeds the amount you approved for the deposit contract to withdraw from your account';

export class PAYGContractManager extends PAYGReadContractManager {
  constructor(
    protected readonly keyProvider: Web3KeyWriteProvider,
    protected readonly config: IPAYGContractManagerConfig,
  ) {
    super(keyProvider, config);
  }

  public async getCurrentAccountBalance() {
    const { currentAccount } = this.keyProvider;

    return (this.ankrTokenContract.methods as IAnkrToken)
      .balanceOf(currentAccount)
      .call();
  }

  private async sendAllowance(allowanceValue: BigNumber) {
    const { currentAccount } = this.keyProvider;

    const data = await (this.ankrTokenContract.methods as IAnkrToken)
      .approve(
        this.config.payAsYouGoContractAddress,
        allowanceValue.toString(10),
      )
      .encodeABI();

    return this.keyProvider.sendTransactionAsync(
      currentAccount,
      this.config.payAsYouGoAnkrTokenContractAddress,
      {
        data,
        gasLimit: GAS_LIMIT,
      },
    );
  }

  private async sendDepositTransaction(
    depositValue: BigNumber,
    publicKey: string,
    expiresAfter: string,
  ) {
    const { currentAccount } = this.keyProvider;

    const data = (this.payAsYouGoContract.methods as IPayAsYouGo)
      .deposit(
        depositValue.toString(10),
        expiresAfter,
        base64ToPrefixedHex(publicKey),
      )
      .encodeABI();

    return this.keyProvider.sendTransactionAsync(
      currentAccount,
      this.config.payAsYouGoContractAddress,
      {
        data,
        gasLimit: GAS_LIMIT,
      },
    );
  }

  private async sendDepositTransactionForUser(
    depositValue: BigNumber,
    publicKey: string,
    targetAddress: string,
    expiresAfter: string,
  ) {
    const { currentAccount } = this.keyProvider;

    const data = (this.payAsYouGoContract.methods as IPayAsYouGo)
      .depositForUser(
        depositValue.toString(10),
        expiresAfter,
        targetAddress,
        base64ToPrefixedHex(publicKey),
      )
      .encodeABI();

    return this.keyProvider.sendTransactionAsync(
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
    const provider = this.keyProvider;
    const { currentAccount } = provider;

    const allowance = await (this.ankrTokenContract.methods as IAnkrToken)
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

  async depositAnkrForUser(
    depositValue: BigNumber,
    publicKey: string,
    targetAddress: string,
    expiresAfter = DEPOSIT_EXPIRATION,
  ): Promise<IWeb3SendResult> {
    const allowanceValue = await this.getAllowanceValue();

    this.throwErrorIfValueIsLessThanZero(depositValue);
    await this.throwErrorIfValueIsGreaterThanBalance(depositValue);
    this.throwErrorIfDepositIsGreaterThanAllowance(
      depositValue,
      allowanceValue,
    );

    return this.sendDepositTransactionForUser(
      roundDecimals(depositValue),
      publicKey,
      targetAddress,
      expiresAfter,
    );
  }

  async rejectAllowance() {
    return this.sendAllowance(new BigNumber(0));
  }
}

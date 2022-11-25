import BigNumber from 'bignumber.js';

import { base64ToPrefixedHex } from '../common';
import { IPAYGContractManagerConfig } from './types';
import { IAnkrToken } from './abi/IAnkrToken';
import { IPayAsYouGo } from './abi/IPayAsYouGo';
import { PAYGReadContractManager } from './PAYGReadContractManager';
import { Web3KeyWriteProvider, IWeb3SendResult } from '@ankr.com/provider';

const GAS_LIMIT = '200000';

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

  private async isAmountGreaterThanBalance(scaledAmount: BigNumber) {
    // make sure user have enough balance
    const balance = await this.getCurrentAccountBalance();

    const scaledBalance = new BigNumber(balance);

    return scaledAmount.isGreaterThan(scaledBalance);
  }

  private async isAllowanceLessThanAmount(scaledAmount: BigNumber) {
    const { currentAccount } = this.keyProvider;

    // make sure user have enough allowance
    const allowance = await (this.ankrTokenContract.methods as IAnkrToken)
      .allowance(currentAccount, this.config.payAsYouGoContractAddress)
      .call();

    const scaledAllowance = new BigNumber(allowance);

    return scaledAllowance.isLessThanOrEqualTo(scaledAmount);
  }

  private async sendAllowance(scaledAmount: BigNumber) {
    const { currentAccount } = this.keyProvider;

    const data = await (this.ankrTokenContract.methods as IAnkrToken)
      .approve(this.config.payAsYouGoContractAddress, scaledAmount.toString(10))
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
    scaledAmount: BigNumber,
    publicKey: string,
    expiresAfter: string,
  ) {
    const { currentAccount } = this.keyProvider;

    const data = (this.payAsYouGoContract.methods as IPayAsYouGo)
      .deposit(
        scaledAmount.toString(10),
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

  private async canAllow(scaledAmount: BigNumber) {
    const isGreaterThanBalance = await this.isAmountGreaterThanBalance(
      scaledAmount,
    );

    if (isGreaterThanBalance) {
      throw new Error(`You don't have enough Ankr tokens`);
    }
  }

  private async canDeposit(scaledAmount: BigNumber) {
    const isAllowanceLessThanAmount = await this.isAllowanceLessThanAmount(
      scaledAmount,
    );

    if (!isAllowanceLessThanAmount) {
      throw new Error(`User doesn't have enough allowance`);
    }
  }

  async getAllowance(amount: BigNumber) {
    const provider = this.keyProvider;
    const web3 = provider.getWeb3();

    const scaledAmount = new BigNumber(web3.utils.toWei(amount.toString(10)));

    await this.canAllow(scaledAmount);

    return this.sendAllowance(scaledAmount);
  }

  async depositAnkr(
    amount: BigNumber,
    publicKey: string,
    // TODO expiresAfter
    expiresAfter = '31536000',
  ): Promise<IWeb3SendResult> {
    const provider = this.keyProvider;
    const web3 = provider.getWeb3();

    const scaledAmount = new BigNumber(web3.utils.toWei(amount.toString(10)));

    await this.canAllow(scaledAmount);
    await this.canDeposit(scaledAmount);

    return this.sendDepositTransaction(scaledAmount, publicKey, expiresAfter);
  }

  async hasEnoughAllowance(amount: BigNumber): Promise<boolean> {
    const { currentAccount } = this.keyProvider;
    const scaledAmount = new BigNumber(
      this.keyProvider.getWeb3().utils.toWei(amount.toString(10)),
    );

    const scaledAllowance = new BigNumber(
      await (this.ankrTokenContract.methods as IAnkrToken)
        .allowance(currentAccount, this.config.payAsYouGoContractAddress)
        .call(),
    );

    return scaledAllowance.isGreaterThanOrEqualTo(scaledAmount);
  }

  async rejectAllowance() {
    return this.sendAllowance(new BigNumber(0));
  }

  async withdrawAnkr(amount: BigNumber): Promise<IWeb3SendResult> {
    const provider = this.keyProvider;
    const { currentAccount } = provider;

    const scaledAmount = new BigNumber(
      provider.getWeb3().utils.toWei(amount.toString(10)),
    );

    const data = (this.payAsYouGoContract.methods as IPayAsYouGo)
      .withdraw(scaledAmount.toString(10))
      .encodeABI();

    return provider.sendTransactionAsync(
      currentAccount,
      this.config.payAsYouGoContractAddress,
      {
        data,
        gasLimit: GAS_LIMIT,
      },
    );
  }
}

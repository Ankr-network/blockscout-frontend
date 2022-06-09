import { Contract } from 'web3-eth-contract';
import { IWeb3KeyProvider, IWeb3SendResult } from '@ankr.com/stakefi-web3';
import BigNumber from 'bignumber.js';

import { base64ToPrefixedHex, PrefixedHex, Web3Address } from '../common';
import { IPAYGContractManagerConfig } from './types';

import ABI_ANKR_TOKEN from './abi/AnkrToken.json';
import ABI_PAY_AS_YOU_GO from './abi/PayAsYouGo.json';
import { IPAYGContractManager } from './interfaces';
import { IAnkrToken } from './abi/IAnkrToken';
import { IPayAsYouGo } from './abi/IPayAsYouGo';

const GAS_LIMIT = '200000';

export class PAYGContractManager implements IPAYGContractManager {
  private readonly ankrTokenContract: Contract;

  private readonly payAsYouGoContract: Contract;

  constructor(
    private readonly keyProvider: IWeb3KeyProvider,
    private readonly config: IPAYGContractManagerConfig,
  ) {
    this.ankrTokenContract = keyProvider.createContract(
      ABI_ANKR_TOKEN,
      config.payAsYouGoAnkrTokenContractAddress,
    );

    this.payAsYouGoContract = keyProvider.createContract(
      ABI_PAY_AS_YOU_GO,
      config.payAsYouGoContractAddress,
    );
  }

  private async isAmountGreaterThanBalance(scaledAmount: BigNumber) {
    const currentAccount = this.keyProvider.currentAccount();

    // make sure user have enough balance
    const balance = await (this.ankrTokenContract.methods as IAnkrToken)
      .balanceOf(currentAccount)
      .call();

    const scaledBalance = new BigNumber(balance);

    return scaledAmount.isGreaterThan(scaledBalance);
  }

  private async isAllowanceLessThanAmount(scaledAmount: BigNumber) {
    const currentAccount = this.keyProvider.currentAccount();

    // make sure user have enough allowance
    const allowance = await (this.ankrTokenContract.methods as IAnkrToken)
      .allowance(currentAccount, this.config.payAsYouGoContractAddress)
      .call();

    const scaledAllowance = new BigNumber(allowance);

    return scaledAllowance.isLessThanOrEqualTo(scaledAmount);
  }

  private async sendAllowance(scaledAmount: BigNumber) {
    const currentAccount = this.keyProvider.currentAccount();

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
    const currentAccount = this.keyProvider.currentAccount();

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

  private async canAllowAndDeposit(scaledAmount: BigNumber) {
    const isGreaterThanBalance = await this.isAmountGreaterThanBalance(
      scaledAmount,
    );

    if (isGreaterThanBalance) {
      throw new Error(`You don't have enough Ankr tokens`);
    }

    const isAllowanceLessThanAmount = await this.isAllowanceLessThanAmount(
      scaledAmount,
    );

    if (!isAllowanceLessThanAmount) {
      throw new Error(`User doesn't have enough allowance`);
    }
  }

  async getAllowance(amount: BigNumber) {
    const scaledAmount = new BigNumber(
      this.keyProvider.getWeb3().utils.toWei(amount.toString(10)),
    );

    await this.canAllowAndDeposit(scaledAmount);

    return this.sendAllowance(scaledAmount);
  }

  async depositAnkr(
    amount: BigNumber,
    publicKey: string,
    // TODO expiresAfter
    expiresAfter = '31536000',
  ): Promise<IWeb3SendResult> {
    const scaledAmount = new BigNumber(
      this.keyProvider.getWeb3().utils.toWei(amount.toString(10)),
    );

    await this.canAllowAndDeposit(scaledAmount);

    return this.sendDepositTransaction(scaledAmount, publicKey, expiresAfter);
  }

  async hasEnoughAllowance(amount: BigNumber): Promise<boolean> {
    const currentAccount = this.keyProvider.currentAccount();
    const scaledAmount = new BigNumber(
      this.keyProvider.getWeb3().utils.toWei(amount.toString()),
    );

    const scaledAllowance = new BigNumber(
      await (this.ankrTokenContract.methods as IAnkrToken)
        .allowance(currentAccount, this.config.payAsYouGoContractAddress)
        .call(),
    );

    return scaledAllowance.isGreaterThanOrEqualTo(scaledAmount);
  }

  async getLatestUserEventLogHash(
    user: Web3Address,
  ): Promise<PrefixedHex | false> {
    const tierAssignedEvents = await this.payAsYouGoContract.getPastEvents(
      'TierAssigned',
      {
        filter: {
          sender: user,
        },
        fromBlock: 'earliest',
        toBlock: 'latest',
      },
    );

    const validEvents = tierAssignedEvents.filter(event => {
      const { expires } = event.returnValues;

      if (expires === 0) return true;

      return new Date().getTime() / 1000 < expires;
    });

    if (!validEvents.length) return false;

    return validEvents[validEvents.length - 1].transactionHash;
  }

  async decryptMessageUsingPrivateKey(
    compatibleJsonData: string,
  ): Promise<string> {
    const account = this.keyProvider.currentAccount();

    return this.keyProvider.getWeb3().givenProvider.request({
      method: 'eth_decrypt',
      params: [compatibleJsonData, account],
    });
  }

  async rejectAllowance() {
    return this.sendAllowance(new BigNumber(0));
  }
}

import { Contract, EventData } from 'web3-eth-contract';
import BigNumber from 'bignumber.js';

import { base64ToPrefixedHex, PrefixedHex, Web3Address } from '../common';
import { IPAYGContractManagerConfig } from './types';

import ABI_ANKR_TOKEN from './abi/AnkrToken.json';
import ABI_PAY_AS_YOU_GO from './abi/PayAsYouGo.json';
import { IPAYGContractManager } from './interfaces';
import { IAnkrToken } from './abi/IAnkrToken';
import { IPayAsYouGo, IPayAsYouGoEvents } from './abi/IPayAsYouGo';
import { Web3KeyWriteProvider, IWeb3SendResult } from '@ankr.com/provider';

const GAS_LIMIT = '200000';

export class PAYGContractManager implements IPAYGContractManager {
  private readonly ankrTokenContract: Contract;

  private readonly payAsYouGoContract: Contract;

  constructor(
    private readonly keyProvider: Web3KeyWriteProvider,
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
    const { currentAccount } = this.keyProvider;

    // make sure user have enough balance
    const balance = await (this.ankrTokenContract.methods as IAnkrToken)
      .balanceOf(currentAccount)
      .call();

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

  async getLatestUserEventLogs(event: IPayAsYouGoEvents, user: Web3Address) {
    return this.payAsYouGoContract.getPastEvents(event, {
      filter: {
        sender: user,
      },
      fromBlock: 'earliest',
      toBlock: 'latest',
    });
  }

  async getLatestUserTierAssignedEventLogHash(
    user: Web3Address,
  ): Promise<PrefixedHex | false> {
    const tierAssignedEvents = await this.getLatestUserEventLogs(
      'TierAssigned',
      user,
    );

    const validEvents = tierAssignedEvents.filter(event => {
      const { expires } = event.returnValues;

      if (expires === 0) return true;

      return new Date().getTime() / 1000 < expires;
    });

    if (!validEvents.length) return false;

    return validEvents[validEvents.length - 1].transactionHash;
  }

  async getLatestLockedFundsEvents(user: Web3Address): Promise<EventData[]> {
    return this.getLatestUserEventLogs('FundsLocked', user);
  }

  async getLatestProviderRequestEvents(
    user: Web3Address,
  ): Promise<EventData[]> {
    const events = await this.getLatestUserEventLogs('ProviderRequest', user);

    const providerRequestEvents = events
      .filter(event => event.returnValues.sender === user)
      .sort((a, b) => a.blockNumber - b.blockNumber);

    return providerRequestEvents;
  }

  async getLatestAllowanceEvents(user: Web3Address): Promise<EventData[]> {
    const events = await this.ankrTokenContract.getPastEvents('Approval', {
      filter: {
        owner: user,
      },
      fromBlock: 'earliest',
      toBlock: 'latest',
    });

    const allowanceEvents = events
      .filter(event => event.returnValues.owner === user)
      .sort((a, b) => a.blockNumber - b.blockNumber);

    return allowanceEvents;
  }

  async decryptMessageUsingPrivateKey(
    compatibleJsonData: string,
  ): Promise<string> {
    const { currentAccount } = this.keyProvider;

    return this.keyProvider.getWeb3().givenProvider.request({
      method: 'eth_decrypt',
      params: [compatibleJsonData, currentAccount],
    });
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

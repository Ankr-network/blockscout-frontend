import { IWeb3SendResult, Web3KeyWriteProvider } from '@ankr.com/provider';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';
import { EventData } from 'web3-eth-contract';

import { IConfig, PrefixedHex, Web3Address } from '../../common';
import { PAYGContractManager as IPAYGContractManager } from '../../PAYGContract';
import { ContractReadService } from './ContractReadService';

export interface IIssueJwtTokenResult {
  isReady: boolean;
  remainingBlocks?: number;
}

export class ContractService extends ContractReadService {
  public constructor(
    private readonly keyProvider: Web3KeyWriteProvider,
    protected readonly PAYGContractManager: IPAYGContractManager,
    private readonly config: IConfig,
  ) {
    super(PAYGContractManager);
  }

  public async depositAnkrToPAYG(
    amount: BigNumber | BigNumber.Value,
    publicKey: string,
  ): Promise<IWeb3SendResult> {
    return this.PAYGContractManager.depositAnkr(
      new BigNumber(amount),
      publicKey,
    );
  }

  public async sendAllowanceForPAYG(
    amount: BigNumber | BigNumber.Value,
  ): Promise<IWeb3SendResult> {
    return this.PAYGContractManager.getAllowance(new BigNumber(amount));
  }

  public async rejectAllowanceForPAYG(): Promise<IWeb3SendResult> {
    return this.PAYGContractManager.rejectAllowance();
  }

  // Will return null for pending transactions and an object if the transaction is successful.
  async getTransactionReceipt(
    transactionHash: PrefixedHex,
  ): Promise<TransactionReceipt> {
    const transactionReceipt = await this.keyProvider
      .getWeb3()
      .eth.getTransactionReceipt(transactionHash);

    return transactionReceipt;
  }

  async withdrawAnkr(
    amount: BigNumber | BigNumber.Value,
  ): Promise<IWeb3SendResult> {
    return this.PAYGContractManager.withdrawAnkr(new BigNumber(amount));
  }

  async getLatestAllowanceEvent(
    user: Web3Address,
  ): Promise<EventData | undefined> {
    const events = await this.PAYGContractManager.getLatestAllowanceEvents(
      user,
    );

    if (!events?.length) return undefined;

    return events[events.length - 1];
  }

  async canIssueJwtToken(
    transactionHash: PrefixedHex,
  ): Promise<IIssueJwtTokenResult> {
    const latestKnownBlockNumber = await this.keyProvider
      .getWeb3()
      .eth.getBlockNumber();

    const transactionReceipt = await this.getTransactionReceipt(
      transactionHash,
    );

    if (!transactionReceipt) {
      return {
        remainingBlocks: this.config.confirmationBlocks,
        isReady: false,
      };
    }

    const passedBlocks =
      latestKnownBlockNumber - transactionReceipt?.blockNumber;

    if (passedBlocks < this.config.confirmationBlocks) {
      return {
        remainingBlocks: this.config.confirmationBlocks - passedBlocks,
        isReady: false,
      };
    }

    return { remainingBlocks: 0, isReady: true };
  }

  public getCurrentAccountBalance() {
    return this.PAYGContractManager.getCurrentAccountBalance();
  }
}

import BigNumber from 'bignumber.js';
import { Web3KeyWriteProvider } from '@ankr.com/provider';

import { IConfig, PrefixedHex, Web3Address } from '../../common';
import {
  PAYGContractManager as IPAYGContractManager,
} from '../../PAYGContract';

export interface IIssueJwtTokenResult {
  isReady: boolean;
  remainingBlocks?: number;
}

export class ContractService {
  constructor(
    private readonly keyProvider: Web3KeyWriteProvider,
    protected readonly PAYGContractManager: IPAYGContractManager,
    private readonly config: IConfig,
  ) {}

  depositAnkrToPAYG(amount: BigNumber, publicKey: string) {
    return this.PAYGContractManager.depositAnkr(amount, publicKey);
  }

  depositAnkrToPAYGForUser(
    amount: BigNumber,
    publicKey: string,
    targetAddress: string,
  ) {
    return this.PAYGContractManager.depositAnkrForUser({
      depositValue: amount,
      publicKey,
      targetAddress,
    });
  }

  setAllowanceForPAYG(amount: BigNumber) {
    return this.PAYGContractManager.setAllowance(amount);
  }

  getAllowanceFee(amount: BigNumber) {
    return this.PAYGContractManager.getAllowanceFee(amount);
  }

  rejectAllowanceForPAYG() {
    return this.PAYGContractManager.rejectAllowance();
  }

  getTransactionReceipt(txHash: PrefixedHex) {
    return this.keyProvider.getWeb3().eth.getTransactionReceipt(txHash);
  }

  getAllowanceValue() {
    return this.PAYGContractManager.getAllowanceValue();
  }

  async getLatestAllowanceEvent(user: Web3Address) {
    const events = await this.PAYGContractManager
      .getLatestAllowanceEvents(user);

    if (!events?.length) return undefined;

    return events[events.length - 1];
  }

  async canIssueJwtToken(
    txHash: PrefixedHex,
    confirmationBlocksNumber: number,
  ): Promise<IIssueJwtTokenResult> {
    const latestKnownBlockNumber = await this.keyProvider
      .getWeb3()
      .eth.getBlockNumber();

    const transactionReceipt = await this.getTransactionReceipt(txHash);

    if (!transactionReceipt) {
      return {
        remainingBlocks: confirmationBlocksNumber,
        isReady: false,
      };
    }

    const passedBlocks =
      latestKnownBlockNumber - transactionReceipt?.blockNumber;

    if (passedBlocks < confirmationBlocksNumber) {
      return {
        remainingBlocks: confirmationBlocksNumber - passedBlocks,
        isReady: false,
      };
    }

    return { remainingBlocks: 0, isReady: true };
  }

  getCurrentAccountBalance() {
    return this.PAYGContractManager.getCurrentAccountBalance();
  }
}

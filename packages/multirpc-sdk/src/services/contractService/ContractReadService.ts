import BigNumber from 'bignumber.js';
import { EventData } from 'web3-eth-contract';
import { TBlockchain } from '@ankr.com/advanced-api/src/api/getLogs/types';

import { Web3Address } from '../../common';
import { PAYGReadContractManager } from '../../PAYGContract';

export class ContractReadService {
  public constructor(
    protected readonly PAYGContractManager: PAYGReadContractManager
  ) {}

  async getLastLockedFundsEvent(
    user: Web3Address,
    blockchain: TBlockchain
  ): Promise<EventData | undefined> {
    const events = await this.PAYGContractManager.getLatestLockedFundsEvents(
      user,
      blockchain,
    );

    const sortedEvent = events?.sort((a, b) => a.blockNumber - b.blockNumber);

    return sortedEvent?.[sortedEvent.length - 1];
  }

  async getBalance(accountAddress: string) {
    return this.PAYGContractManager.getBalance(accountAddress);
  }

  async estimateAllowanceFee(amount: BigNumber, from: Web3Address) {
    return this.PAYGContractManager.estimateAllowanceFee(amount, from);
  }

  async estimateDepositFee(amount: BigNumber, from: Web3Address) {
    return this.PAYGContractManager.estimateDepositFee(amount, from);
  }
}

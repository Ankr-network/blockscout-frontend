import BigNumber from 'bignumber.js';
import { EventData } from 'web3-eth-contract';
import { TBlockchain } from '@ankr.com/advanced-api/src/api/getLogs/types';

import { Web3Address } from '../../common';
import { PAYGReadContractManager } from '../../PAYGContract';

export class ContractReadService {
  constructor(
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

    const sortedEvents = events?.sort((a, b) => a.blockNumber - b.blockNumber);

    return sortedEvents?.[sortedEvents.length - 1];
  }

  getBalance(accountAddress: Web3Address) {
    return this.PAYGContractManager.getBalance(accountAddress);
  }

  getAllowance(accountAddress: Web3Address) {
    return this.PAYGContractManager.getAllowance(accountAddress);
  }

  estimateAllowanceFee(amount: BigNumber, from: Web3Address) {
    return this.PAYGContractManager.estimateAllowanceFee(amount, from);
  }

  estimateDepositFee(amount: BigNumber, from: Web3Address) {
    return this.PAYGContractManager.estimateDepositFee(amount, from);
  }
}

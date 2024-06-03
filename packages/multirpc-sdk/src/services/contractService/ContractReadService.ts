import { EventData } from 'web3-eth-contract';
import { TBlockchain } from '@ankr.com/advanced-api/src/api/getLogs/types';

import { Web3Address } from '../../common';
import {
  PAYGContractManager as IPAYGContractManager,
  PAYGReadContractManager,
} from '../../PAYGContract';

export type { EventData };

export class ContractReadService {
  public constructor(
    protected readonly PAYGContractManager:
      | PAYGReadContractManager
      | IPAYGContractManager,
  ) { }

  public async getLastLockedFundsEvent(
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
}

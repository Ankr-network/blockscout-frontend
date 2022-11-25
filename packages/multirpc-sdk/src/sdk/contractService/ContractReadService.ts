import { EventData } from 'web3-eth-contract';

import { Web3Address } from '../../common';
import {
  PAYGContractManager as IPAYGContractManager,
  PAYGReadContractManager,
} from '../../PAYGContract';


export class ContractReadService {
  public constructor(
    protected readonly PAYGContractManager:
      | PAYGReadContractManager
      | IPAYGContractManager,
  ) {}

  public async getLastLockedFundsEvent(
    user: Web3Address,
  ): Promise<EventData | undefined> {
    const events = await this.PAYGContractManager.getLatestLockedFundsEvents(
      user,
    );

    return events?.[events.length - 1];
  }
}

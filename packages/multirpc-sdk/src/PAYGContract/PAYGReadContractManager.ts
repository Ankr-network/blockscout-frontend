import { Contract, EventData } from 'web3-eth-contract';

import { PrefixedHex, Web3Address } from '../common';
import { IPAYGContractManagerConfig } from './types';

import ABI_ANKR_TOKEN from './abi/AnkrToken.json';
import ABI_PAY_AS_YOU_GO from './abi/PayAsYouGo.json';
import { IPayAsYouGoEvents } from './abi/IPayAsYouGo';
import { Web3KeyWriteProvider, Web3KeyReadProvider } from '@ankr.com/provider';
import { getPastEventsBlockchain } from '../PremiumPlanContract/utils';

export class PAYGReadContractManager {
  protected readonly ankrTokenContract: Contract;

  protected readonly payAsYouGoContract: Contract;

  constructor(
    protected readonly keyProvider: Web3KeyWriteProvider | Web3KeyReadProvider,
    protected readonly config: IPAYGContractManagerConfig,
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

  private async getLatestUserEventLogs(
    event: IPayAsYouGoEvents,
    user: Web3Address,
  ) {
    const contract = this.payAsYouGoContract;
    const startBlock = this.config.payAsYouGoContractCreationBlockNumber;

    const latestBlockNumber = await this.keyProvider
      .getWeb3()
      .eth.getBlockNumber();

    return getPastEventsBlockchain({
      web3: this.keyProvider.getWeb3(),
      contract,
      eventName: event,
      filter: {
        sender: user,
      },
      startBlock,
      latestBlockNumber,
    });
  }

  public async getAllLatestUserTierAssignedEventLogHashes(
    user: Web3Address,
  ): Promise<string[] | false> {
    const tierAssignedEvents = await this.getLatestUserEventLogs(
      'TierAssigned',
      user,
    );

    if (!tierAssignedEvents.length) return false;

    return tierAssignedEvents.map(item => item.transactionHash);
  }

  public async getLatestUserTierAssignedEventLogHash(
    user: Web3Address,
  ): Promise<PrefixedHex | false> {
    const tierAssignedEvents = await this.getLatestUserEventLogs(
      'TierAssigned',
      user,
    );

    if (!tierAssignedEvents.length) return false;

    return tierAssignedEvents[tierAssignedEvents.length - 1].transactionHash;
  }

  public async getLatestLockedFundsEvents(
    user: Web3Address,
  ): Promise<EventData[]> {
    return this.getLatestUserEventLogs('FundsLocked', user);
  }

  public async getLatestAllowanceEvents(
    user: Web3Address,
  ): Promise<EventData[]> {
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
}

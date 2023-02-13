import flatten from 'lodash.flatten';
import { EventData } from 'web3-eth-contract';
import { getPastEvents, isMainnet } from '@ankr.com/advanced-api';
import { IGetPastEvents } from './types';
import { batchEvents } from '@ankr.com/staking-sdk';

// Block step range for events
export const ETH_HISTORY_RANGE_STEP = 3_000;

export const getPastEventsBlockchain = async ({
  web3,
  contract,
  eventName,
  startBlock,
  latestBlockNumber,
  rangeStep = ETH_HISTORY_RANGE_STEP,
  filter,
}: IGetPastEvents): Promise<EventData[]> => {
  if (isMainnet) {
    return getPastEvents({
      fromBlock: startBlock,
      toBlock: latestBlockNumber,
      blockchain: 'eth',
      contract,
      web3,
      eventName,
      filter,
    });
  }
  return flatten(await batchEvents({
    contract,
    eventName,
    rangeStep,
    startBlock,
    filter,
    latestBlockNumber,
  }));
};

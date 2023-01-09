import flatten from 'lodash.flatten';
import { EventData } from 'web3-eth-contract';
import { getPastEvents, isMainnet } from '@ankr.com/advanced-api';
import { IGetPastEvents } from './types';

// Block step range for events
export const ETH_HISTORY_RANGE_STEP = 3_000;

const HAS_ADVANCED_API = false;

export const getPastEventsBlockchain = async ({
  web3,
  contract,
  eventName,
  startBlock,
  latestBlockNumber,
  rangeStep = ETH_HISTORY_RANGE_STEP,
  filter,
}: IGetPastEvents): Promise<EventData[]> => {
  if (isMainnet && HAS_ADVANCED_API) {
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
  
  const eventsPromises: Promise<EventData[]>[] = [];

  for (let i = startBlock; i < latestBlockNumber; i += rangeStep) {
    const fromBlock = i;
    const toBlock = fromBlock + rangeStep;

    eventsPromises.push(
      contract.getPastEvents(eventName, { fromBlock, toBlock, filter }),
    );
  }

  const pastEvents = await Promise.all(eventsPromises);

  return flatten(pastEvents);
};

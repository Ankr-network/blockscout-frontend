import { EventData } from 'web3-eth-contract';
import { getPastEvents, isMainnet } from '@ankr.com/advanced-api';
import { IGetPastEvents } from './types';

// Block step range for events
export const ETH_HISTORY_RANGE_STEP = 3_000;

export const getPastEventsBlockchain = async ({
  web3,
  contract,
  eventName,
  startBlock,
  latestBlockNumber,
  filter,
}: IGetPastEvents): Promise<EventData[]> => {
  return getPastEvents({
    fromBlock: startBlock,
    toBlock: latestBlockNumber,
    blockchain: isMainnet ? 'eth' : 'eth_goerli',
    contract,
    web3,
    eventName,
    filter,
  });
};

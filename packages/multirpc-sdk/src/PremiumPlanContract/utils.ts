import { EventData } from 'web3-eth-contract';
import { getPastEvents, isMainnet } from '@ankr.com/advanced-api';
import { IGetPastEvents } from './types';

export const getPastEventsBlockchain = async ({
  web3,
  contract,
  eventName,
  startBlock,
  latestBlockNumber,
  filter,
  apiUrl,
}: IGetPastEvents): Promise<EventData[]> => {
  return getPastEvents({
    fromBlock: startBlock,
    toBlock: latestBlockNumber,
    blockchain: isMainnet ? 'eth' : 'eth_goerli',
    contract,
    web3,
    eventName,
    filter,
    apiUrl,
  });
};

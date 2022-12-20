import BigNumber from 'bignumber.js';
import flatten from 'lodash/flatten';
import { EventData } from 'web3-eth-contract';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { IGetPastEvents } from '../stake';

import {
  IWeb3LatestBlockNumberProps,
  IWeb3ReadableAmountFromWeiProps,
} from './types';

export const getWeb3LatestBlockNumber = <Provider extends Web3KeyReadProvider>({
  provider,
}: IWeb3LatestBlockNumberProps<Provider>): Promise<number> => {
  const web3 = provider.getWeb3();

  return web3.eth.getBlockNumber();
};

export const getWeb3PastEventsFromBlockchainByRange = async ({
  contract,
  eventName,
  filter,
  latestBlockNumber,
  rangeStep,
  startBlock,
}: IGetPastEvents): Promise<EventData[]> => {
  const eventsPromises: Promise<EventData[]>[] = [];

  for (let i = startBlock; i < latestBlockNumber; i += rangeStep) {
    const fromBlock = i;
    const toBlock = fromBlock + rangeStep;

    eventsPromises.push(
      contract.getPastEvents(eventName, {
        filter,
        fromBlock,
        toBlock,
      }),
    );
  }

  const pastEvents = await Promise.all(eventsPromises);

  return flatten(pastEvents);
};

export const getWeb3ReadableAmountFromWei = <
  Provider extends Web3KeyReadProvider,
>({
  amount,
  provider,
}: IWeb3ReadableAmountFromWeiProps<Provider>): BigNumber => {
  const web3 = provider.getWeb3();

  return new BigNumber(web3.utils.fromWei(amount));
};

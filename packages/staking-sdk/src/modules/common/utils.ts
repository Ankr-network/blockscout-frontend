import BigNumber from 'bignumber.js';
import flatten from 'lodash/flatten';
import { EventData } from 'web3-eth-contract';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { IGetPastEvents } from '../stake';

import {
  IWeb3LatestBlockNumberProps,
  IWeb3ReadableAmountFromWeiProps,
} from './types';

/**
 * Get the latest block number from Web3.
 *
 * @param {Provider} provider - current selected provider
 * @returns {Promise<number>}
 */
export const getWeb3LatestBlockNumber = <Provider extends Web3KeyReadProvider>({
  provider,
}: IWeb3LatestBlockNumberProps<Provider>): Promise<number> => {
  const web3 = provider.getWeb3();

  return web3.eth.getBlockNumber();
};

/**
 * Get past events from blockchain by block range.
 *
 * @param {Contract} contract - target contract
 * @param {string} eventName - event name from contract
 * @param {Filter | undefined} filter - custom filter
 * @param {number} latestBlockNumber - latest block number
 * @param {number} rangeStep - custom range step
 * @param {number} startBlock - start block number
 * @returns {Promise<EventData[]>}
 */
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

/**
 * Get human-readable amount from Wei.
 *
 * @param {string} amount - target amount
 * @param {Provider} provider - current selected provider
 * @returns {BigNumber}
 */
export const getWeb3ReadableAmountFromWei = <
  Provider extends Web3KeyReadProvider,
>({
  amount,
  provider,
}: IWeb3ReadableAmountFromWeiProps<Provider>): BigNumber => {
  const web3 = provider.getWeb3();

  return new BigNumber(web3.utils.fromWei(amount));
};

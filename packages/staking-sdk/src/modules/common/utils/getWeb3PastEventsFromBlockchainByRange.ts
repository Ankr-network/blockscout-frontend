import flatten from 'lodash/flatten';
import { EventData } from 'web3-eth-contract';

import { IGetPastEvents } from '../../stake';

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

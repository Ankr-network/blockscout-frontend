import { EventData } from 'web3-eth-contract';

interface IFilteredEvents {
  bondEvents: EventData[];
  certEvents: EventData[];
}

/**
 * Get filtered contract events.
 *
 * @param {EventData[]} events
 * @return {IFilteredEvents}
 */
export const getFilteredContractEvents = (
  events: EventData[],
): IFilteredEvents => {
  return events.reduce<IFilteredEvents>(
    (acc, current) => {
      if (current.returnValues.isRebasing) {
        acc.bondEvents.push(current);
      } else {
        acc.certEvents.push(current);
      }

      return acc;
    },
    { bondEvents: [], certEvents: [] },
  );
};
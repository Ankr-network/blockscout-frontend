import { EventData } from 'web3-eth-contract';

const compareTwoEventsFn = <T extends EventData>(a: T, b: T): number => {
  if (a.blockNumber !== b.blockNumber) {
    return a.blockNumber - b.blockNumber;
  }
  if (a.transactionIndex !== b.transactionIndex) {
    return a.transactionIndex - b.transactionIndex;
  }
  return a.logIndex - b.logIndex;
};

export const sortEventData = <T extends EventData>(
  a: T[],
  b: T[] = [],
  c: T[] = [],
): T[] => {
  const fn = (d: EventData, e: EventData): number => {
    return compareTwoEventsFn(d, e);
  };
  return a.concat(b, c).sort(fn);
};

interface IHasEventData {
  event?: EventData;
}

export const sortHasEventData = <T extends IHasEventData>(
  a: T[],
  b: T[] = [],
  c: T[] = [],
): T[] => {
  const fn = (d: IHasEventData, e: IHasEventData): number => {
    return compareTwoEventsFn(d.event as EventData, e.event as EventData);
  };
  return a.concat(b, c).sort(fn);
};

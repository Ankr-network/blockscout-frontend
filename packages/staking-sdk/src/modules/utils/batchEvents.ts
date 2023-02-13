import { Contract, EventData, Filter } from 'web3-eth-contract';

const EVENT_BATCH_SIZE = 20;

export interface IBatchEventsArgs {
  contract: Contract;
  eventName: string;
  rangeStep: number;
  startBlock: number;
  filter?: Filter;
  eventsPromises?: EventData[][];
  latestBlockNumber: number;
}

export const batchEvents = async ({
  contract,
  eventName,
  rangeStep,
  startBlock,
  filter,
  eventsPromises = [],
  latestBlockNumber,
}: IBatchEventsArgs): Promise<EventData[][]> => {

  const innerPromise = [];
  let lastStep = 0
  for (let l = EVENT_BATCH_SIZE * rangeStep; lastStep < l; lastStep += rangeStep) {
    const fromBlock = startBlock + lastStep;
    const toBlock = fromBlock + rangeStep;

    innerPromise.push(
      contract.getPastEvents(eventName, { fromBlock, toBlock, filter }),
    );
  }

  const lastParsedBlock = startBlock + lastStep;

  const resolvedPromises = await Promise.all(innerPromise);

  const results = eventsPromises.concat(resolvedPromises);

  if (latestBlockNumber > lastParsedBlock) {
    return batchEvents({
      contract,
      eventName,
      rangeStep,
      startBlock: lastParsedBlock,
      filter,
      eventsPromises: results,
      latestBlockNumber,
    });
  }

  return results;
}

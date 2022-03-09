import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { Contract, EventData } from 'web3-eth-contract';

import { ZERO } from 'modules/common/const';

interface ITxHistoryEventData extends EventData {
  timestamp: number;
}

interface IGetAPYArgs {
  tokenContract: Contract;
  web3: Web3;
  eventName?: string;
  batchSize?: number;
  blocksDepth?: number;
}

export const getAPY = async ({
  tokenContract,
  web3,
  batchSize = 12,
  blocksDepth = 3000,
  eventName = 'RatioUpdate',
}: IGetAPYArgs): Promise<BigNumber> => {
  if (batchSize <= 0 || blocksDepth <= 0) {
    return ZERO;
  }

  const secOneYear = new BigNumber(31_536_000);
  const initRatio = new BigNumber(1e18);

  const [blockNumber, newRatio] = await Promise.all([
    web3.eth.getBlockNumber(),
    tokenContract.methods.ratio().call(),
  ]);

  const fromBlockFisrt = blockNumber - blocksDepth;
  const fromBlockLast = blockNumber - blocksDepth * batchSize;
  const toBlockLast = blockNumber - blocksDepth * (batchSize - 1);

  if (fromBlockFisrt <= 0 || fromBlockLast <= 0 || toBlockLast <= 0) {
    return ZERO;
  }

  const [firstEvents, lastEvents] = await Promise.all([
    tokenContract.getPastEvents(eventName, {
      fromBlock: blockNumber - blocksDepth,
      filter: {
        newRatio,
      },
    }),
    tokenContract.getPastEvents(eventName, {
      fromBlock: fromBlockLast,
      toBlock: toBlockLast,
      filter: {
        newRatio,
      },
    }),
  ]);

  const rawEvents = firstEvents.concat(lastEvents);

  const [firstRawEvent, lastRawEvent]: [EventData | void, EventData | void] = [
    rawEvents[rawEvents.length - 1],
    rawEvents[0],
  ];

  if (!firstRawEvent || !lastRawEvent) {
    return ZERO;
  }

  const [timestampFirst, timestampLast] = await Promise.all([
    web3.eth.getBlock(firstRawEvent.blockHash, false),
    web3.eth.getBlock(lastRawEvent.blockHash, false),
  ]);

  const [firstRawData, lastRawData]: [
    ITxHistoryEventData,
    ITxHistoryEventData,
  ] = [
    {
      ...firstRawEvent,
      timestamp: timestampFirst.timestamp as number,
    },
    {
      ...lastRawEvent,
      timestamp: timestampLast.timestamp as number,
    },
  ];

  if (!firstRawData.timestamp || !lastRawData.timestamp) {
    return ZERO;
  }

  const ratio1 = new BigNumber(firstRawData.returnValues?.newRatio ?? 0);
  const ratio2 = new BigNumber(lastRawData.returnValues?.newRatio ?? 0);

  const timestamp1 = new BigNumber(firstRawData.timestamp);
  const timestamp2 = new BigNumber(lastRawData.timestamp);

  const timestampDelta = timestamp1.minus(timestamp2).abs();

  if (timestampDelta.isZero()) {
    return ZERO;
  }

  // Note: ((Math.abs(ratio1 - ratio2) / Math.abs(timeStamp1 - timeStamp2)) * 'seconds in one year') / 'init ratio'
  const apy = ratio1
    .minus(ratio2)
    .abs()
    .div(timestampDelta)
    .multipliedBy(secOneYear)
    .div(initRatio);

  return !apy.isNaN() ? apy : ZERO;
};

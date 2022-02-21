import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { Contract, EventData } from 'web3-eth-contract';

interface ITxHistoryEventData extends EventData {
  timestamp: number;
}

interface IGetAPYArgs {
  tokenContract: Contract;
  web3: Web3;
  eventName?: string;
  batchSize?: number;
  blocksDeep?: number;
}

export const getAPY = async ({
  tokenContract,
  web3,
  batchSize = 12,
  blocksDeep = 3000,
  eventName = 'RatioUpdate',
}: IGetAPYArgs): Promise<BigNumber> => {
  const secOneYear = new BigNumber(31_536_000);
  const initRatio = new BigNumber(1e18);
  const defaultState = new BigNumber(0);

  const blockNumber = await web3.eth.getBlockNumber();

  const newRatio = await tokenContract.methods.ratio().call();

  const eventsBatch = Array(batchSize)
    .fill(0)
    .map(async (_, i) =>
      tokenContract.getPastEvents(eventName, {
        fromBlock: blockNumber - blocksDeep * (i + 1),
        toBlock: i ? blockNumber - blocksDeep * i : undefined,
        filter: {
          newRatio,
        },
      }),
    );

  const data = await Promise.all(eventsBatch);
  const rawEvents = data.reduce((acc, pastEvents) => [...acc, ...pastEvents]);

  const [firstRawEvent, lastRawEvent]: [EventData | void, EventData | void] = [
    rawEvents[rawEvents.length - 1],
    rawEvents[0],
  ];

  if (
    typeof firstRawEvent === 'undefined' ||
    typeof lastRawEvent === 'undefined'
  ) {
    return defaultState;
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

  if (
    typeof firstRawData.timestamp === 'undefined' ||
    typeof lastRawData.timestamp === 'undefined'
  ) {
    return defaultState;
  }

  const ratio1 = new BigNumber(firstRawData.returnValues?.newRatio ?? 0);
  const ratio2 = new BigNumber(lastRawData.returnValues?.newRatio ?? 0);

  const timeStamp1 = new BigNumber(firstRawData.timestamp);
  const timeStamp2 = new BigNumber(lastRawData.timestamp);

  // Note: ((Math.abs(ratio1 - ratio2) / Math.abs(timeStamp1 - timeStamp2)) * 'seconds in one year') / 'init ratio'
  const apyVal = ratio1
    .minus(ratio2)
    .abs()
    .div(timeStamp1.minus(timeStamp2).abs())
    .multipliedBy(secOneYear)
    .div(initRatio);

  return apyVal.isNaN() ? defaultState : apyVal;
};

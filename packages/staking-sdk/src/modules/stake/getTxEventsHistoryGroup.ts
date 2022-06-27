import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { EventData } from 'web3-eth-contract';

import { ITxEventsHistoryGroupItem } from './types';

interface IGetTxEventsHistoryGroupArgs {
  rawEvents?: EventData[];
  web3: Web3;
}

export const getTxEventsHistoryGroup = async ({
  rawEvents,
  web3,
}: IGetTxEventsHistoryGroupArgs): Promise<ITxEventsHistoryGroupItem[]> => {
  if (!Array.isArray(rawEvents) || !rawEvents.length) {
    return [];
  }

  const blocks = await Promise.all(
    rawEvents.map(event => web3.eth.getBlock(event.blockHash, false)),
  );

  const rawData = blocks.map((block, index) => ({
    ...rawEvents[index],
    timestamp: block.timestamp as number,
  }));

  const safeFromWei = (value: string | number): BigNumber => {
    const integerAmount = new BigNumber(value).integerValue().toString();
    return new BigNumber(web3.utils.fromWei(integerAmount));
  };

  return rawData
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(({ event, returnValues: { amount }, timestamp, transactionHash }) => ({
      txAmount: safeFromWei(amount),
      txDate: new Date(timestamp * 1_000),
      txHash: transactionHash,
      txType: event,
    }));
};

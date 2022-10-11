import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import { ILog } from '../../getLogs/types';
import { IEventData } from '../types';

import { generateLogId } from './generateLogId';

interface ITransformLogToEventArgs {
  log: ILog;
  event: AbiItem;
  web3: Web3;
}

export const transformLogToEvent = ({
  log,
  event,
  web3,
}: ITransformLogToEventArgs): IEventData => {
  if (!event.inputs || !event.name) {
    throw new Error('There is no such interface');
  }

  const topics = [...log.topics];
  topics.shift();

  const decodedParams = web3.eth.abi.decodeLog(event.inputs, log.data, topics);

  return {
    event: event.name,
    returnValues: decodedParams,
    signature: log.topics[0],
    logIndex: web3.utils.hexToNumber(log.logIndex),
    transactionIndex: web3.utils.hexToNumber(log.transactionIndex),
    transactionHash: log.transactionHash,
    blockHash: log.blockHash,
    blockNumber: web3.utils.hexToNumber(log.blockNumber),
    address: log.address,
    removed: log.removed,
    id: generateLogId(log) ?? '',
    raw: {
      data: log.data,
      topics: log.topics,
    },
  };
};

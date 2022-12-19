import { getLogs, IGetLogsArgs } from '../getLogs/getLogs';

import { IEventData } from './types';
import { transformLogToEvent } from './utils/transformLogToEvent';

interface IGetPastEventsArgs extends IGetLogsArgs {}

export const getPastEvents = async ({
  fromBlock,
  toBlock,
  blockchain,
  contract,
  web3,
  eventName,
  filter,
}: IGetPastEventsArgs): Promise<IEventData[]> => {
  const eventJsonInterface = contract.options.jsonInterface.find(
    elem => elem.name === eventName,
  );

  if (!eventJsonInterface || !eventJsonInterface.inputs) {
    throw new Error('There is no such interface');
  }

  const { data } = await getLogs({
    fromBlock,
    toBlock,
    blockchain,
    contract,
    web3,
    eventName,
    filter,
  });

  return data.result.logs.map(log =>
    transformLogToEvent({ web3, log, event: eventJsonInterface }),
  );
};

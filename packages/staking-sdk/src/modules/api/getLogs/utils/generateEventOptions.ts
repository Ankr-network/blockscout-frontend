/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import { IFilter } from '../types';

// todo: add support for all events request
const ALL_EVENTS = 'ALLEVENTS';

type TTopics = string[];

interface IOptions {
  fromBlock?: number;
  toBlock?: number;
  filter?: IFilter;
  topics?: TTopics;
}

interface IGenerateEventOptionsArgs {
  web3: Web3;
  eventName: string;
  options: IOptions;
  jsonInterface: AbiItem[];
}

interface IGenerateEventOptions {
  topics: TTopics;
}

export function generateEventOptions({
  eventName = ALL_EVENTS,
  options,
  jsonInterface,
  web3,
}: IGenerateEventOptionsArgs): IGenerateEventOptions {
  const isAllEvents = eventName.toUpperCase() === ALL_EVENTS;

  if (isAllEvents) {
    throw new Error('generateEventOptions: ALLEVENTS unsupported for now');
  }

  const defaultEvent = {
    name: ALL_EVENTS,
    jsonInterface,
  };

  const event = isAllEvents
    ? defaultEvent
    : jsonInterface.find((json: any) => {
        const isEvent = json.type === 'event';
        const isExactEvent = json.name === eventName;
        const isExactEncodedEvent =
          json.signature === `0x${eventName.replace('0x', '')}`;

        return isEvent && (isExactEvent || isExactEncodedEvent);
      });

  const topics = encodeEventABI({ event, options, web3 });

  return { topics };
}

interface IEncodeEventABIArgs {
  event: any;
  options: IOptions;
  web3: Web3;
}

function encodeEventABI({
  event,
  options,
  web3,
}: IEncodeEventABIArgs): TTopics {
  const filter = options.filter || {};

  let topics: TTopics = [];

  const isAllEvents = event.name === ALL_EVENTS;

  // use given topics
  if (Array.isArray(options.topics)) {
    topics = options.topics;

    // create topics based on filter
  } else {
    topics = [];

    // add event signature
    if (event && !event.anonymous && !isAllEvents) {
      topics.push(event.signature);
    }

    // add event topics (indexed arguments)
    if (!isAllEvents) {
      const indexedTopics = event.inputs
        .filter((input: any) => {
          return input.indexed === true;
        })
        .map((input: any) => {
          const value = filter[input.name];
          if (!value) {
            return null;
          }

          if (Array.isArray(value)) {
            return value.map(v => {
              return web3.eth.abi.encodeParameter(input.type, v);
            });
          }
          return web3.eth.abi.encodeParameter(input.type, value);
        });

      topics = topics.concat(indexedTopics);
    }
  }

  return topics;
}

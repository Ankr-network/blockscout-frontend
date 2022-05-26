import { faker } from '@faker-js/faker';
import { IRequestsEntity, IRequestsRequest } from '../account/types';
import { createArray } from './utils';

const createRow = (_: any, index: number): IRequestsEntity => ({
  number: index,
  chainId: faker.random.arrayElement([
    'harmony',
    'avalanche',
    'eth',
    'fantom',
    'polygon',
    'solana',
    'xdai',
    'celo',
    'arbitrum',
    'bsc',
    'iotex',
    'nervos',
  ]),
  method: faker.random.arrayElement(['eth_GetBlockByNumber', 'Batch (3)']),
  errorCode: faker.random.arrayElement([200, 404, 500]),
  httpCode: faker.random.arrayElement([200, 404, 500]),
  responseTime: faker.datatype.number({ max: 1000 }),
  dateTime: faker.datatype.datetime().toISOString(),
  costUsd: faker.finance.amount(0.000012, 0.00358, 6),
  rawParams: '["11573830", "true"]',
  rawResult: faker.datatype.json(),
});

export const getRequestsMock = (params: IRequestsRequest) => {
  return createArray(params.limit, createRow);
};

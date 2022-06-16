import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { ChainType, MethodRequest, Period } from 'domains/chains/types';

export interface MethodRequestsParams {
  chainType: ChainType;
  period: Period;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const getRandomInt = (max = 25_000_000) => Math.floor(Math.random() * max);

const methods = [
  'eth_call',
  'eth_getTransactionReceipt',
  'eth_getBalance',
  'eth_getBlockByNumber',
  'eth_getTransactionCount',
  'eth_blockNumber',
  'eth_getLogs',
  'eth_getTransactionByHash',
  'eth_getCode',
  'eth_getStorageAt',
];

export const fetchMethodRequests = createAction<RequestAction<MethodRequest[]>>(
  'account/fetchMethodRequests',
  () => ({
    request: {
      promise: (async (): Promise<MethodRequest[]> => {
        // to imitate loading procces
        await sleep(500);

        return methods.map<MethodRequest>(method => ({
          method,
          calls: getRandomInt(),
        }));
      })(),
    },
    meta: {
      asMutation: false,
      takeLatest: true,
    },
  }),
);

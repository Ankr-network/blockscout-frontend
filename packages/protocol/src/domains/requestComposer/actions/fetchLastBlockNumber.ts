import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import Web3 from 'web3';

export const fetchLastBlockNumber = createAction<RequestAction<number>>(
  'chains/fetchLastBlockNumber',
  (web3URL: string) => ({
    request: {
      promise: (async () => {})(),
    },
    meta: {
      poll: 30,
      hideNotificationOnError: true,
      onRequest: () => {
        return {
          promise: (async () => {
            const result = await new Web3(web3URL).eth.getBlockNumber();

            return result;
          })(),
        };
      },
      onError: () => {
        return '';
      },
    },
  }),
);

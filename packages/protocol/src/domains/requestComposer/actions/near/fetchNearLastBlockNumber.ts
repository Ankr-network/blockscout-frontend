import { RequestAction } from '@redux-requests/core';
import { getNearConnectionConfig } from 'domains/requestComposer/constants/near';
import { connect } from 'near-api-js';
import { createAction } from 'redux-smart-actions';

export const fetchNearLastBlockNumber = createAction<RequestAction<number>>(
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
            const nearConnection = await connect(
              getNearConnectionConfig(web3URL),
            );

            const { provider } = nearConnection.connection;

            const block = await provider.block({ finality: 'optimistic' });

            return block.header.height;
          })(),
        };
      },
      onError: () => {
        return '';
      },
    },
  }),
);

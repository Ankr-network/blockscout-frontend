import { RequestAction } from '@redux-requests/core';
import retry from 'async-retry';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';

import { Milliseconds } from '../../common/types';
import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

const POLL_INTERVAL: Milliseconds = 10_000;

export interface IGetTxData {
  amount?: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
  provider: string;
}

interface IGetTxDataProps {
  txHash: string;
}

export const getTxData = createAction<RequestAction<IGetTxData, IGetTxData>>(
  `${ANKR_ACTIONS_PREFIX}getTxData`,
  ({ txHash }: IGetTxDataProps) => ({
    request: {
      promise: async (): Promise<IGetTxData> => {
        const sdk = await AnkrStakingSDK.getInstance();
        const provider = await sdk.getProvider();

        return retry(
          async () => {
            return sdk.fetchTxData(txHash, await provider.getBlockNumber());
          },
          {
            factor: 1,
            minTimeout: POLL_INTERVAL,
            retries: 5,
          },
        );
      },
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      onRequest: withStore,
    },
  }),
);

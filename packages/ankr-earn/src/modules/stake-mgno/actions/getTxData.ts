import { RequestAction } from '@redux-requests/core';
import retry from 'async-retry';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { Milliseconds } from '../../common/types';
import { GnosisStakingSDK } from '../api/GnosisStakingSDK/GnosisStakingSDK';
import { MGNO_ACTIONS_PREFIX } from '../const';

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
  `${MGNO_ACTIONS_PREFIX}getTxData`,
  ({ txHash }: IGetTxDataProps) => ({
    request: {
      promise: (async (): Promise<IGetTxData> => {
        const sdk = await GnosisStakingSDK.getInstance();

        return retry(
          async () => {
            return sdk.fetchTxData(txHash);
          },
          {
            factor: 1,
            minTimeout: POLL_INTERVAL,
            retries: 5,
          },
        );
      })(),
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
    },
  }),
);

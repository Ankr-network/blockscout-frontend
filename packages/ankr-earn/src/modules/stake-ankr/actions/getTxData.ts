import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

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

        return sdk.fetchTxData(txHash);
      },
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      onRequest: withStore,
    },
  }),
);

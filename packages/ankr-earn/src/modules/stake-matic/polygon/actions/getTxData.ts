import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import {
  IFetchTxData,
  IStakeData,
  MaticPolygonSDK,
} from '@ankr.com/staking-sdk';

import { withStore } from 'modules/common/utils/withStore';

import { MATIC_POLYGON_ACTIONS_PREFIX } from '../const';

export const getTxData = createSmartAction<
  RequestAction<IFetchTxData, IFetchTxData>,
  [IStakeData]
>(`${MATIC_POLYGON_ACTIONS_PREFIX}/getTxData`, ({ txHash }) => ({
  request: {
    promise: async (): Promise<IFetchTxData> => {
      const sdk = await MaticPolygonSDK.getInstance();

      return sdk.getTxData(txHash);
    },
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    onRequest: withStore,
  },
}));

import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';

import { BinanceSDK } from '../api/BinanceSDK';

interface IFetchPendingValuesResponseData {
  pendingAbnbbUnstakes: BigNumber;
  pendingAbnbcUnstakes: BigNumber;
}

export const fetchPendingValues = createSmartAction<
  RequestAction<
    IFetchPendingValuesResponseData,
    IFetchPendingValuesResponseData
  >
>(
  'bnb/fetchPendingValues',
  (): RequestAction => ({
    request: {
      promise: async (): Promise<IFetchPendingValuesResponseData> => {
        const sdk = await BinanceSDK.getInstance();

        const { pendingABNBB, pendingABNBC } = await sdk.getPendingUnstakes();

        return {
          pendingAbnbbUnstakes: pendingABNBB,
          pendingAbnbcUnstakes: pendingABNBC,
        };
      },
    },
    meta: {
      asMutation: false,
      getData: (
        data: IFetchPendingValuesResponseData,
      ): IFetchPendingValuesResponseData => data,
      onRequest: withStore,
    },
  }),
);

import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { BinanceSDK } from '@ankr.com/staking-sdk';

import { withStore } from 'modules/common/utils/withStore';

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

        const { pendingBond, pendingCertificate } = await sdk.getPendingData();

        return {
          pendingAbnbbUnstakes: pendingBond,
          pendingAbnbcUnstakes: pendingCertificate,
        };
      },
    },
    meta: {
      asMutation: false,
      onRequest: withStore,
    },
  }),
);

import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { AvalancheSDK } from '@ankr.com/staking-sdk';

import { withStore } from 'modules/common/utils/withStore';

interface IFetchPendingValuesResponseData {
  pendingAavaxbUnstakes: BigNumber;
  pendingAavaxcUnstakes: BigNumber;
}

export const fetchPendingValues = createSmartAction<
  RequestAction<
    IFetchPendingValuesResponseData,
    IFetchPendingValuesResponseData
  >
>(
  'avax/fetchPendingValues',
  (): RequestAction => ({
    request: {
      promise: async (): Promise<IFetchPendingValuesResponseData> => {
        const sdk = await AvalancheSDK.getInstance();

        const { pendingBond, pendingCertificate } = await sdk.getPendingData();

        return {
          pendingAavaxbUnstakes: pendingBond,
          pendingAavaxcUnstakes: pendingCertificate,
        };
      },
    },
    meta: {
      asMutation: false,
      onRequest: withStore,
    },
  }),
);

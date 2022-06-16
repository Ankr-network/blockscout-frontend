import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';

import { AvalancheSDK } from '../api/AvalancheSDK';

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

        const { pendingAAVAXB, pendingAAVAXC } = await sdk.getPendingUnstakes();

        return {
          pendingAavaxbUnstakes: pendingAAVAXB,
          pendingAavaxcUnstakes: pendingAAVAXC,
        };
      },
    },
    meta: {
      asMutation: false,
      onRequest: withStore,
    },
  }),
);

import { BigNumber } from 'bignumber.js';
import { RequestAction } from '@redux-requests/core';
import { getAnkrUsdt } from 'modules/api/sdk';
import { withStore } from 'domains/auth/utils/withStore';
import { createAction as createSmartAction } from 'redux-smart-actions';

export interface IRates {
  ankrUsdt: BigNumber;
}

export const fetchRates = createSmartAction<RequestAction<IRates, IRates>>(
  'common/rates',
  () => ({
    request: {
      promise: async () => {
        const ankrUsdt = await getAnkrUsdt();

        return {
          ankrUsdt,
        };
      },
    },
    meta: {
      onRequest: withStore,
    },
  }),
);

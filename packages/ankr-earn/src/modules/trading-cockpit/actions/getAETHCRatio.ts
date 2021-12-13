import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';
import { ETHHttpProviderSingleton } from '../api/ETHHttpProviderSingleton';
import { ACTIONS_PREFIX } from '../const';

export const getAETHCRatio = createAction<RequestAction<BigNumber, BigNumber>>(
  `${ACTIONS_PREFIX}getAETHCRatio`,
  () => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      getData: data => data,
      onRequest: () => {
        return {
          promise: (async (): Promise<BigNumber> => {
            const httpProvider = new ETHHttpProviderSingleton();
            return await httpProvider.getAETHCRatio();
          })(),
        };
      },
    },
  }),
);

import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IUnstakingData } from '../api/AnkrStakingSDK/types';
import { ANKR_ACTIONS_PREFIX } from '../const';

interface IGetUnstakingDataArgs {
  usdPrice: BigNumber;
}

export const getUnstakingData = createAction<
  RequestAction<IUnstakingData[], IUnstakingData[]>,
  [IGetUnstakingDataArgs]
>(`${ANKR_ACTIONS_PREFIX}getUnstakingData`, ({ usdPrice }) => ({
  request: {
    promise: (async (): Promise<IUnstakingData[]> => {
      const sdk = await AnkrStakingSDK.getInstance();

      return sdk.getUnstaking(usdPrice);
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));

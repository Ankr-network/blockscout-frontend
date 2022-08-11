import { RequestAction } from '@redux-requests/core';
import { BigNumber } from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IActiveStakingData } from '../api/AnkrStakingSDK/types';
import { ANKR_ACTIONS_PREFIX } from '../const';

interface IGetActiveStakingDataArgs {
  usdPrice: BigNumber;
}

export const getActiveStakingData = createAction<
  RequestAction<IActiveStakingData[], IActiveStakingData[]>,
  [IGetActiveStakingDataArgs]
>(`${ANKR_ACTIONS_PREFIX}getActiveStakingData`, ({ usdPrice }) => ({
  request: {
    promise: (async (): Promise<IActiveStakingData[]> => {
      const sdk = await AnkrStakingSDK.getInstance();

      return sdk.getMyActiveStaking(usdPrice);
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));

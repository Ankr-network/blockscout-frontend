import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { GnosisStakingSDK } from '../api/GnosisStakingSDK/GnosisStakingSDK';
import { MGNO_ACTIONS_PREFIX } from '../const';

interface IGetTotalInfo {
  myTotalDelegatedAmount: BigNumber;
  myAllValidationRewards: BigNumber;
}

export const getTotalInfo = createAction<
  RequestAction<IGetTotalInfo, IGetTotalInfo>
>(`${MGNO_ACTIONS_PREFIX}getTotalInfo`, () => ({
  request: {
    promise: (async (): Promise<IGetTotalInfo> => {
      const sdk = await GnosisStakingSDK.getInstance();

      const myTotalDelegatedAmount = await sdk.getMyTotalDelegatedAmount();
      const myAllValidationRewards = await sdk.getAllMyRewards();

      return {
        myTotalDelegatedAmount,
        myAllValidationRewards,
      };
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));

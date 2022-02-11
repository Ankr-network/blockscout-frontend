import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';
import { getAftmbBalance, getFtmBalance, getMinimumStake } from '../api/sdk';
import { ACTIONS_PREFIX } from '../const';

interface IGetCommonData {
  ftmBalance: BigNumber;
  minStake: BigNumber;
  aFTMbBalance: BigNumber;
}

export const getCommonData = createAction<
  RequestAction<IGetCommonData, IGetCommonData>
>(`${ACTIONS_PREFIX}getCommonData`, () => ({
  request: {
    promise: (async (): Promise<IGetCommonData> => {
      const [ftmBalance, minStake, aFTMbBalance] = await Promise.all([
        getFtmBalance(),
        getMinimumStake(),
        getAftmbBalance(),
      ]);

      return {
        ftmBalance,
        minStake,
        aFTMbBalance,
      };
    })(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    getData: data => data,
  },
}));

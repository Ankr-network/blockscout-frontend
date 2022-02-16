import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { Seconds } from 'modules/common/types';
import { createAction } from 'redux-smart-actions';
import { getAftmbBalance, getFtmBalance, getMinimumStake } from '../api/sdk';
import { ACTIONS_PREFIX } from '../const';

const CACHE_TIME: Seconds = 30;

interface IGetCommonData {
  ftmBalance: BigNumber;
  minStake: BigNumber;
  aFTMbBalance: BigNumber;
}

export const getCommonData = createAction<
  RequestAction<IGetCommonData, IGetCommonData>,
  [RequestActionMeta<IGetCommonData, IGetCommonData>?]
>(`${ACTIONS_PREFIX}getCommonData`, meta => ({
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
    cache: CACHE_TIME,
    ...meta,
    asMutation: false,
    showNotificationOnError: true,
    getData: data => data,
  },
}));

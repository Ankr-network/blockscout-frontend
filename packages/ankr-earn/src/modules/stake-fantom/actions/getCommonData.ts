import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { FantomSDK } from '../api/sdk';
import { ACTIONS_PREFIX } from '../const';

interface IGetCommonData {
  ftmBalance: BigNumber;
  minStake: BigNumber;
  aFTMbBalance: BigNumber;
  pendingUnstakes: BigNumber;
  aFTMcBalance: BigNumber;
  aFTMcRatio: BigNumber;
}

export const getCommonData = createAction<
  RequestAction<IGetCommonData, IGetCommonData>,
  [RequestActionMeta<IGetCommonData, IGetCommonData>?]
>(`${ACTIONS_PREFIX}getCommonData`, meta => ({
  request: {
    promise: (async (): Promise<IGetCommonData> => {
      const sdk = await FantomSDK.getInstance();

      const [
        ftmBalance,
        minStake,
        aFTMbBalance,
        pendingUnstakes,
        aFTMcBalance,
        aFTMcRatio,
      ] = await Promise.all([
        sdk.getFtmBalance(),
        sdk.getMinimumStake(),
        sdk.getAftmbBalance(),
        sdk.getPendingUnstakes(),
        sdk.getAftmcBalance(),
        sdk.getAFTMCRatio(),
      ]);

      return {
        ftmBalance,
        minStake,
        aFTMbBalance,
        pendingUnstakes,
        aFTMcBalance,
        aFTMcRatio,
      };
    })(),
  },
  meta: {
    ...meta,
    asMutation: false,
    showNotificationOnError: true,
    getData: data => data,
  },
}));

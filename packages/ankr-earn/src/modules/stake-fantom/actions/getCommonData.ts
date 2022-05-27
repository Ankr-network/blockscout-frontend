import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { FantomSDK } from '../api/sdk';
import { ACTIONS_PREFIX } from '../const';

interface IGetCommonData {
  ftmBalance: BigNumber;
  minStake: BigNumber;
  aFTMbBalance: BigNumber;
  bondPendingUnstakes: BigNumber;
  certPendingUnstakes: BigNumber;
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
        bondPendingUnstakes,
        certPendingUnstakes,
        aFTMcBalance,
        aFTMcRatio,
      ] = await Promise.all([
        sdk.getFtmBalance(),
        sdk.getMinimumStake(),
        sdk.getABBalance(),
        sdk.getPendingUnstakes('bond'),
        sdk.getPendingUnstakes('cert'),
        sdk.getACBalance(),
        sdk.getACRatio(),
      ]);

      return {
        ftmBalance,
        minStake,
        aFTMbBalance,
        bondPendingUnstakes,
        certPendingUnstakes,
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

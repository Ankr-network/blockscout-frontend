import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { MaticPolygonSDK } from '@ankr.com/staking-sdk';

import { MATIC_POLYGON_ACTIONS_PREFIX } from '../const';

export interface IGetCommonData {
  maticBalance: BigNumber;
  maticBondBalance: BigNumber;
  maticCertBalance: BigNumber;
  ratio: BigNumber;
}

export const getCommonData = createAction<
  RequestAction<IGetCommonData, IGetCommonData>
>(`${MATIC_POLYGON_ACTIONS_PREFIX}getCommonData`, () => ({
  request: {
    promise: (async (): Promise<IGetCommonData> => {
      const sdk = await MaticPolygonSDK.getInstance();

      const [maticBondBalance, maticCertBalance, maticBalance, ratio] =
        await Promise.all([
          sdk.getABBalance(),
          sdk.getACBalance(),
          sdk.getMaticBalance(),
          sdk.getACRatio(),
        ]);

      return {
        maticBalance,
        maticBondBalance,
        maticCertBalance,
        ratio,
      };
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));

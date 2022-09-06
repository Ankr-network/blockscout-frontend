import { configFromEnv } from '@ankr.com/staking-sdk/src/modules/common';
import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { IGetTxData, IStakeData, MaticPolygonSDK } from '@ankr.com/staking-sdk';

import { Token } from 'modules/common/types/token';
import { withStore } from 'modules/common/utils/withStore';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';

import { MATIC_POLYGON_ACTIONS_PREFIX } from '../const';

interface IGetTxDataProps extends IStakeData {
  token: TMaticSyntToken;
}

const { polygonConfig } = configFromEnv();

export const getTxData = createSmartAction<
  RequestAction<IGetTxData, IGetTxData>,
  [IGetTxDataProps]
>(`${MATIC_POLYGON_ACTIONS_PREFIX}getTxData`, ({ token, txHash }) => ({
  request: {
    promise: async (): Promise<IGetTxData> => {
      const targetTokenAddr =
        token === Token.aMATICc
          ? polygonConfig.aMATICcToken
          : polygonConfig.aMATICbToken;

      const sdk = await MaticPolygonSDK.getInstance();

      return sdk.getTxData(targetTokenAddr, txHash);
    },
  },
  meta: {
    showNotificationOnError: true,
    onRequest: withStore,
  },
}));

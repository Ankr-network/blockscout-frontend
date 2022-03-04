import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { SupportedChainIDS } from 'modules/common/const';

import { BridgeSDK } from '../api/BridgeSDK';
import { AvailableBridgeTokens } from '../types';
import { getTokenAddr } from '../utils/getTokenAddr';

export const approve = createSmartAction<
  RequestAction<boolean, boolean>,
  [BigNumber, AvailableBridgeTokens, SupportedChainIDS]
>('bridge/approve', (amount, token, fromChainId) => ({
  request: {
    promise: (async (): Promise<boolean> => {
      const sdk = await BridgeSDK.getInstance();
      const tokenAddr = getTokenAddr(token, fromChainId);

      return sdk.approve(amount, tokenAddr);
    })(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    getData: data => data,
  },
}));

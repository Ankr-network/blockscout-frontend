import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { PolygonOnEthereumSDK } from '@ankr.com/staking-sdk';

import { TMaticSyntToken } from 'modules/stake-matic/common/types';

import { MATIC_ETH_ACTIONS_PREFIX } from '../const';

interface IGetStakeGasFeeProps {
  amount: BigNumber;
  token: TMaticSyntToken;
}

export const getStakeGasFee = createSmartAction<
  RequestAction<BigNumber, BigNumber>,
  [IGetStakeGasFeeProps]
>(`${MATIC_ETH_ACTIONS_PREFIX}getStakeGasFee`, ({ amount, token }) => ({
  request: {
    promise: (async (): Promise<BigNumber> => {
      const sdk = await PolygonOnEthereumSDK.getInstance();

      return sdk.getStakeGasFee(amount, token);
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));

import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { AvalancheSDK } from '../api/AvalancheSDK';
import { TAvaxSyntToken } from '../types';

interface IGetStakeGasFeeArgs {
  amount: BigNumber;
  token: TAvaxSyntToken;
}

export const getStakeGasFee = createAction<
  RequestAction<BigNumber, BigNumber>,
  [IGetStakeGasFeeArgs]
>(`avax/getStakeGasFee`, ({ amount, token }) => ({
  request: {
    promise: (async (): Promise<BigNumber> => {
      const sdk = await AvalancheSDK.getInstance();

      return sdk.getStakeGasFee(amount, token);
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));

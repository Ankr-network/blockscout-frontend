import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { BinanceSDK } from '@ankr.com/staking-sdk';

import { TBnbSyntToken } from '../types';

interface IGetStakeGasFeeArgs {
  amount: BigNumber;
  token: TBnbSyntToken;
}

export const getStakeGasFee = createAction<
  RequestAction<BigNumber, BigNumber>,
  [IGetStakeGasFeeArgs]
>(`bnb/getStakeGasFee`, ({ amount, token }) => ({
  request: {
    promise: (async (): Promise<BigNumber> => {
      const sdk = await BinanceSDK.getInstance();

      return sdk.getStakeGasFee(amount, token);
    })(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    getData: data => data,
  },
}));

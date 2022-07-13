import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { EthereumSDK, TEthToken } from '@ankr.com/staking-sdk';

import { ETH_ACTIONS_PREFIX } from '../const';

interface IGetStakeGasFeeArgs {
  amount: BigNumber;
  token: TEthToken;
}

export const getStakeGasFee = createAction<
  RequestAction<BigNumber, BigNumber>,
  [IGetStakeGasFeeArgs]
>(`${ETH_ACTIONS_PREFIX}getStakeGasFee`, ({ amount, token }) => ({
  request: {
    promise: (async (): Promise<BigNumber> => {
      const sdk = await EthereumSDK.getInstance();

      return sdk.getStakeGasFee(amount, token);
    })(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    getData: data => data,
  },
}));

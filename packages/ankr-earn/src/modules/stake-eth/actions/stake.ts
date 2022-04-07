import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { IWeb3SendResult } from 'provider';

import { EthSDK, TEthToken } from 'modules/api/EthSDK';

import { ETH_ACTIONS_PREFIX } from '../const';

import { getCommonData } from './getCommonData';

interface IStakeArgs {
  token: TEthToken;
  amount: BigNumber;
}

export const stake = createAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>,
  [IStakeArgs]
>(`${ETH_ACTIONS_PREFIX}stake`, ({ amount, token }) => ({
  request: {
    promise: (async (): Promise<IWeb3SendResult> => {
      const sdk = await EthSDK.getInstance();

      return sdk.stake(amount, token);
    })(),
  },
  meta: {
    showNotificationOnError: true,
    asMutation: true,
    onSuccess: (response, _action, { dispatchRequest }) => {
      dispatchRequest(getCommonData());
      return response;
    },
  },
}));

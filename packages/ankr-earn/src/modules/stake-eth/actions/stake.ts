import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction } from 'redux-smart-actions';

import { EthereumSDK, TEthToken, IStakeData } from '@ankr.com/staking-sdk';

import { ETH_ACTIONS_PREFIX } from '../const';

import { getCommonData } from './getCommonData';

interface IStakeArgs {
  token: TEthToken;
  amount: BigNumber;
}

export const stake = createAction<
  RequestAction<IStakeData, IStakeData>,
  [IStakeArgs]
>(`${ETH_ACTIONS_PREFIX}stake`, ({ amount, token }) => ({
  request: {
    promise: (async (): Promise<IStakeData> => {
      const sdk = await EthereumSDK.getInstance();

      return sdk.stake(amount, token);
    })(),
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
    onSuccess: (response, _action, { dispatchRequest, dispatch }) => {
      dispatchRequest(getCommonData());

      if (response.data.txHash) {
        dispatch(push(`${token}/${response.data.txHash}/`));
      }
      return response;
    },
  },
}));

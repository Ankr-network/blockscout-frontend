import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction } from 'redux-smart-actions';

import { FantomSDK, IStakeData } from '@ankr.com/staking-sdk';

import { ACTIONS_PREFIX } from '../const';
import { RoutesConfig } from '../Routes';
import { TFtmSyntToken } from '../types/TFtmSyntToken';

import { getCommonData } from './getCommonData';

interface IStakeArgs {
  amount: BigNumber;
  token: TFtmSyntToken;
}

export const stake = createAction<
  RequestAction<IStakeData, IStakeData>,
  [IStakeArgs]
>(`${ACTIONS_PREFIX}stake`, ({ amount, token }) => ({
  request: {
    promise: (async (): Promise<IStakeData> => {
      const sdk = await FantomSDK.getInstance();

      return sdk.stake(amount, token);
    })(),
  },
  meta: {
    showNotificationOnError: true,
    asMutation: true,
    onSuccess: (response, _action, { dispatchRequest, dispatch }) => {
      dispatchRequest(getCommonData());

      if (response.data.txHash) {
        dispatch(
          push(
            RoutesConfig.stakeStep.generatePath({
              txHash: response.data.txHash,
              tokenOut: token,
            }),
          ),
        );
      }

      return response;
    },
  },
}));

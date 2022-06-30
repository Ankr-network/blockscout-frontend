import { IWeb3SendResult } from '@ankr.com/provider';
import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction } from 'redux-smart-actions';

import { FantomSDK } from '../api/sdk';
import { ACTIONS_PREFIX } from '../const';
import { RoutesConfig } from '../Routes';
import { TFtmSyntToken } from '../types/TFtmSyntToken';

import { getCommonData } from './getCommonData';

interface IStakeArgs {
  amount: BigNumber;
  token: TFtmSyntToken;
}

export const stake = createAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>,
  [IStakeArgs]
>(`${ACTIONS_PREFIX}stake`, ({ amount, token }) => ({
  request: {
    promise: (async (): Promise<IWeb3SendResult> => {
      const sdk = await FantomSDK.getInstance();

      return sdk.stake(amount, token);
    })(),
  },
  meta: {
    showNotificationOnError: true,
    asMutation: true,
    onSuccess: (response, _action, { dispatchRequest, dispatch }) => {
      dispatchRequest(getCommonData());

      if (response.data.transactionHash) {
        dispatch(
          push(
            RoutesConfig.stakeStep.generatePath({
              txHash: response.data.transactionHash,
              tokenOut: token,
            }),
          ),
        );
      }

      return response;
    },
  },
}));

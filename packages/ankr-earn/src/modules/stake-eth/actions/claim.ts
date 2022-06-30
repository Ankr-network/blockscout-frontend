import { IWeb3SendResult } from '@ankr.com/provider';
import { RequestAction, getQuery } from '@redux-requests/core';
import { push } from 'connected-react-router';
import { createAction } from 'redux-smart-actions';

import { EthSDK, TEthToken } from 'modules/api/EthSDK';
import { Token } from 'modules/common/types/token';

import { ETH_ACTIONS_PREFIX } from '../const';
import { RoutesConfig } from '../Routes';

import { getCommonData } from './getCommonData';

export const claim = createAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>,
  [TEthToken]
>(`${ETH_ACTIONS_PREFIX}claim`, token => ({
  request: {
    promise: (async (): Promise<IWeb3SendResult> => {
      const sdk = await EthSDK.getInstance();

      return sdk.claim(token);
    })(),
  },
  meta: {
    showNotificationOnError: true,
    asMutation: true,
    onSuccess: (
      response: { data: IWeb3SendResult },
      _action,
      { dispatchRequest, dispatch, getState },
    ) => {
      const { data } = getQuery(getState(), { type: getCommonData });
      const amount = (
        token === Token.aETHb ? data.claimableAETHB : data.claimableAETHC
      ).toString();

      if (response.data.transactionHash) {
        const claimStepsPath = RoutesConfig.claimSteps.generatePath({
          tokenOut: token,
          txHash: response.data.transactionHash,
          amount,
        });

        dispatch(push(claimStepsPath));
      }

      dispatchRequest(getCommonData());
      return response;
    },
  },
}));

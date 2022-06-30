import { IWeb3SendResult } from '@ankr.com/provider';
import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { EthereumSDK } from '@ankr.com/staking-sdk';

import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { ETH_ACTIONS_PREFIX } from 'modules/stake-eth/const';

/**
 * This method is only for creating a testing ability.
 * It is related to the [STAKAN-1259](https://ankrnetwork.atlassian.net/browse/STAKAN-1259)
 * Do not use it for the production code.
 * @deprecated
 */
export const stakeWithoutClaim = createAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>,
  [BigNumber]
>(`${ETH_ACTIONS_PREFIX}stake`, amount => ({
  request: {
    promise: (async (): Promise<IWeb3SendResult> => {
      const sdk = await EthereumSDK.getInstance();

      return sdk.stakeWithoutClaim(amount);
    })(),
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
    onSuccess: (response, _action, { dispatchRequest }) => {
      dispatchRequest(getCommonData());

      return response;
    },
  },
}));

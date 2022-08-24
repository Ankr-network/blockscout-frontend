import { RequestAction } from '@redux-requests/core';
import { push } from 'connected-react-router';
import { createAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { TxHash } from 'modules/common/types';
import { TStore } from 'modules/common/types/ReduxRequests';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';
import { RoutesConfig } from '../Routes';

import { getHistoryData } from './getHistoryData';

interface IClaimArgs {
  provider: string;
}

export const claimRewards = createAction<
  RequestAction<TxHash, TxHash>,
  [IClaimArgs]
>(
  `${ANKR_ACTIONS_PREFIX}claimRewards`,
  ({ provider }): RequestAction => ({
    request: {
      promise: (async (): Promise<TxHash> => {
        const sdk = await AnkrStakingSDK.getInstance();

        return sdk.claimRewards(provider);
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
      onSuccess: (
        response: { data: TxHash },
        _action: RequestAction,
        store: TStore<IStoreState>,
      ) => {
        store.dispatchRequest(getHistoryData());
        const txHash = response.data;

        if (txHash) {
          store.dispatch(
            push(
              RoutesConfig.claimRewardsSteps.generatePath({
                txHash,
              }),
            ),
          );
        }

        return response;
      },
    },
  }),
);

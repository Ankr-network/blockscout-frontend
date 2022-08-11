import { RequestAction } from '@redux-requests/core';
import { push } from 'connected-react-router';
import { createAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { TStore } from 'modules/common/types/ReduxRequests';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';
import { RoutesConfig } from '../Routes';

import { getHistoryData } from './getHistoryData';

type TTxHash = string;

interface IClaimArgs {
  provider: string;
}

export const claimAllForValidator = createAction<
  RequestAction<TTxHash, TTxHash>,
  [IClaimArgs]
>(
  `${ANKR_ACTIONS_PREFIX}claimAllForValidator`,
  ({ provider }): RequestAction => ({
    request: {
      promise: (async (): Promise<TTxHash> => {
        const sdk = await AnkrStakingSDK.getInstance();

        return sdk.claimAllForValidator(provider);
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
      onSuccess: (
        response: { data: TTxHash },
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

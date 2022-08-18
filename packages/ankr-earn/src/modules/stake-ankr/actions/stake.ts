import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { TTxHash } from 'modules/common/types';
import { TStore } from 'modules/common/types/ReduxRequests';
import { resetForm } from 'modules/forms/store/formsSlice';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX, ANKR_STAKE_FORM_ID } from '../const';
import { RoutesConfig } from '../Routes';

import { getCommonData } from './getCommonData';

interface IStakeArgs {
  amount: BigNumber;
  provider: string;
}

export const stake = createSmartAction<
  RequestAction<TTxHash, TTxHash>,
  [IStakeArgs]
>(
  `${ANKR_ACTIONS_PREFIX}/stake`,
  ({ amount, provider }): RequestAction => ({
    request: {
      promise: (async (): Promise<TTxHash> => {
        const sdk = await AnkrStakingSDK.getInstance();

        return sdk.delegate(provider, amount);
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
        store.dispatchRequest(getCommonData());
        const txHash = response.data;

        if (txHash) {
          store.dispatch(resetForm(ANKR_STAKE_FORM_ID));

          store.dispatch(
            push(
              RoutesConfig.stakeSteps.generatePath({
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

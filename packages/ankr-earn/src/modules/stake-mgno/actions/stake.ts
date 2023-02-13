import { t } from '@ankr.com/common';
import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { TxHash } from 'modules/common/types';
import { TStore } from 'modules/common/types/ReduxRequests';
import { resetForm } from 'modules/forms/store/formsSlice';
import { RoutesConfig } from 'modules/stake-mgno/Routes';

import { GnosisStakingSDK } from '../api/GnosisStakingSDK/GnosisStakingSDK';
import { MGNO_ACTIONS_PREFIX, MGNO_STAKE_FORM_ID } from '../const';

import { getBalance } from './getBalance';

interface IStakeArgs {
  amount: BigNumber;
  provider: string;
}

export const stake = createSmartAction<
  RequestAction<TxHash, TxHash>,
  [IStakeArgs]
>(
  `${MGNO_ACTIONS_PREFIX}stake`,
  ({ amount, provider }): RequestAction => ({
    request: {
      promise: (async (): Promise<TxHash> => {
        const sdk = await GnosisStakingSDK.getInstance();

        return sdk.stake(provider, amount);
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
      additionalErrorText: t('stake-mgno.errors.stake'),
      onSuccess: (
        response: { data: TxHash },
        _action: RequestAction,
        store: TStore<IStoreState>,
      ) => {
        store.dispatchRequest(getBalance());
        const txHash = response.data;

        if (txHash) {
          store.dispatch(resetForm(MGNO_STAKE_FORM_ID));

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

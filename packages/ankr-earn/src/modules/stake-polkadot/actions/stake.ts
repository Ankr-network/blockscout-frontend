import { t } from '@ankr.com/common';
import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { TStore } from 'modules/common/types/ReduxRequests';
import { showNotification } from 'modules/notifications';

import { PolkadotStakeSDK } from '../api/PolkadotStakeSDK';
import { EPolkadotNetworks } from '../types';

import { fetchPolkadotAccountMaxSafeBalance } from './fetchPolkadotAccountMaxSafeBalance';
import { fetchStakeStats } from './fetchStakeStats';

interface IRes {
  data: void;
}

export const stake = createSmartAction<
  RequestAction<void, void>,
  [EPolkadotNetworks, BigNumber]
>(
  'polkadot/stake',
  (network, amount): RequestAction => ({
    request: {
      promise: (async (): Promise<void> => {
        const sdk = await PolkadotStakeSDK.getInstance();

        return sdk.stake(network, amount);
      })(),
    },
    meta: {
      asMutation: true,
      onError: (
        error: Error,
        action: RequestAction,
        store: TStore<IStoreState>,
      ): Error => {
        const errorWithCustomText = getExtendedErrorText(
          error,
          t('stake-polkadot.errors.stake'),
        );
        const err = new Error(errorWithCustomText);

        store.dispatchRequest(fetchPolkadotAccountMaxSafeBalance(network));

        store.dispatch(
          showNotification({
            message: err.toString(),
            key: action.type,
            variant: 'error',
          }),
        );

        throw err;
      },
      onSuccess: (
        response: IRes,
        _action: RequestAction,
        store: TStore<IStoreState>,
      ): IRes => {
        store.dispatchRequest(fetchPolkadotAccountMaxSafeBalance(network));

        store.dispatchRequest(fetchStakeStats());

        return response;
      },
    },
  }),
);

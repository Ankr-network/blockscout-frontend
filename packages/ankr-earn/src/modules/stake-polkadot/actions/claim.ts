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
import { fetchTxHistory } from './fetchTxHistory';

interface IClaimProps {
  claimableAmount: BigNumber;
  isLedgerWallet?: boolean;
  network: EPolkadotNetworks;
}

interface IRes {
  data: void;
}

export const claim = createSmartAction<
  RequestAction<void, void>,
  [IClaimProps]
>(
  'polkadot/claim',
  ({ claimableAmount, isLedgerWallet, network }): RequestAction => ({
    request: {
      promise: (async (): Promise<void> => {
        const sdk = await PolkadotStakeSDK.getInstance();

        return isLedgerWallet
          ? sdk.claimLedgerWallet(network, claimableAmount)
          : sdk.claim(network, claimableAmount);
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
          t('stake-polkadot.errors.claim'),
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
        store.dispatchRequest(fetchTxHistory(network));

        return response;
      },
    },
  }),
);

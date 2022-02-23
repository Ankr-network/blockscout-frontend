import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { IWeb3SendResult, AvailableWriteProviders } from 'provider';

import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { withStore } from 'modules/common/utils/withStore';

import { addTokenToWallet } from '../api/sdk';
import { TSwapOption } from '../types';

export interface IAddTokenToWalletArgs {
  providerId: AvailableWriteProviders;
  swapOption: TSwapOption;
}

export const addEth2SwapTokenToWallet = createAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>,
  [IAddTokenToWalletArgs]
>(
  'eth2-swap/addEth2SwapTokenToWallet',
  ({ providerId, swapOption }: IAddTokenToWalletArgs) => ({
    request: {
      promise: async () =>
        addTokenToWallet({
          providerManager: ProviderManagerSingleton.getInstance(),
          providerId,
          swapOption,
        }),
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      getData: data => data,
      onRequest: withStore,
    },
  }),
);

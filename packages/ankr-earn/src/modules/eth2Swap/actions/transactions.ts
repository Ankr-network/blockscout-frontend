import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { IWeb3SendResult } from 'provider';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { withStore } from 'modules/common/utils/withStore';
import { AvailableProviders } from 'provider/providerManager/types';
import { lockShares, unlockShares, approveAETHCForAETHB } from '../api/sdk';
import { TSwapOption } from '../types';
import { getEth2SwapData } from './getEth2SwapData';

export interface ISwapAssetsArgs {
  amount: string;
  providerId: AvailableProviders;
  swapOption: TSwapOption;
}

export const swapAssets = createAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>,
  [ISwapAssetsArgs]
>(
  'eth2-swap/swapAssets',
  ({ providerId, swapOption, amount }: ISwapAssetsArgs) => ({
    request: {
      promise: async () => {
        const providerManager = ProviderManagerSingleton.getInstance();

        if (swapOption === 'aETHb') {
          return unlockShares({ amount, providerManager, providerId });
        }

        return lockShares({ amount, providerManager, providerId });
      },
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
      onRequest: withStore,
      getData: data => data,
      onSuccess: async (response, _action, store) => {
        await response.data?.receiptPromise;

        store.dispatchRequest(
          getEth2SwapData({ providerId: AvailableProviders.ethCompatible }),
        );

        return response;
      },
    },
  }),
);

export interface IApproveAETHCArgs {
  providerId: AvailableProviders;
}

export const approveAETHC = createAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>,
  [IApproveAETHCArgs]
>('eth2-swap/approveAETHC', ({ providerId }: IApproveAETHCArgs) => ({
  request: {
    promise: async () =>
      approveAETHCForAETHB({
        providerManager: ProviderManagerSingleton.getInstance(),
        providerId,
      }),
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
    onRequest: withStore,
    getData: data => data,
    onSuccess: async (response, _action, store) => {
      await response.data?.receiptPromise;

      store.dispatchRequest(
        getEth2SwapData({ providerId: AvailableProviders.ethCompatible }),
      );

      return response;
    },
  },
}));

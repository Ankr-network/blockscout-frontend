import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { AvailableWriteProviders } from 'provider';

import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { withStore } from 'modules/common/utils/withStore';

import { fetchEth2SwapData } from '../api/sdk';

export interface IGetEth2SwapDataArgs {
  providerId: AvailableWriteProviders;
}

export interface IGetEth2SwapData {
  ratio: BigNumber;
  fethBalance: BigNumber;
  aethBalance: BigNumber;
  allowance: BigNumber;
}

export const getEth2SwapData = createAction<
  RequestAction<IGetEth2SwapData, IGetEth2SwapData>,
  [IGetEth2SwapDataArgs]
>('eth2-swap/getEth2SwapData', ({ providerId }) => ({
  request: {
    promise: async () =>
      fetchEth2SwapData({
        providerManager: ProviderManagerSingleton.getInstance(),
        providerId,
      }),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    onRequest: withStore,
  },
}));

import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { AvailableReadProviders } from 'provider';

import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { ACTION_CACHE_SEC, isMainnet } from 'modules/common/const';

import { PolygonSDK } from '../api/PolygonSDK';

const readProviderId = isMainnet
  ? AvailableReadProviders.ethMainnet
  : AvailableReadProviders.ethGoerli;

export const fetchAPY = createSmartAction<
  RequestAction<BigNumber, BigNumber>,
  [boolean?]
>('polygon/fetchAPY', isWriteProvider => ({
  request: {
    promise: (async () => {
      const providerManager = ProviderManagerSingleton.getInstance();

      let provider;
      
      if (isWriteProvider) {
        provider = await providerManager.getETHWriteProvider();
      } else {
        provider = await providerManager.getETHReadProvider(readProviderId);
      }

      const web3 = provider.getWeb3();

      return PolygonSDK.getAMaticbAPY(web3);
    })(),
  },
  meta: {
    asMutation: false,
    cache: ACTION_CACHE_SEC,
    getData: (data: BigNumber): BigNumber => data.multipliedBy(100),
  },
}));

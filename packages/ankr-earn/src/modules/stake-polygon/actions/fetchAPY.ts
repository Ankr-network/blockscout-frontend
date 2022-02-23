import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { AvailableReadProviders } from 'provider';

import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { ACTION_CACHE_SEC, isMainnet } from 'modules/common/const';

import { PolygonSDK } from '../api/PolygonSDK';

export const fetchAPY = createSmartAction<RequestAction<BigNumber, BigNumber>>(
  'polygon/fetchAPY',
  () => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        return PolygonSDK.getaMaticbAPY(
          await ProviderManagerSingleton.getInstance().getReadProvider(
            isMainnet
              ? AvailableReadProviders.ethMainnetHttpProvider
              : AvailableReadProviders.ethGoerliHttpProvider,
          ),
        );
      })(),
    },
    meta: {
      cache: ACTION_CACHE_SEC,
      asMutation: false,
      getData: (data: BigNumber): BigNumber => data.multipliedBy(100),
    },
  }),
);

import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { ACTION_CACHE_SEC, isMainnet } from 'modules/common/const';
import { AvailableReadProviders } from 'provider/providerManager/types';
import { createAction as createSmartAction } from 'redux-smart-actions';
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
      asMutation: false,
      cache: ACTION_CACHE_SEC,
      getData: (data: BigNumber): BigNumber => data.multipliedBy(100),
    },
  }),
);

import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { PolygonSDK } from '../api/PolygonSDK';
import { ProviderManagerSingleton } from '../../api/ProviderManagerSingleton';
import { AvailableReadProviders } from 'provider/providerManager/types';
import { isMainnet } from '../../common/const';

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
      cache: 600,
      asMutation: false,
      getData: (data: BigNumber): BigNumber => data.multipliedBy(100),
    },
  }),
);

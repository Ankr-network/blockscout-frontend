import {
  EBlockchain,
  ethNetworkIdByBlockchainMap,
  getTokenPriceByChainId,
} from 'multirpc-sdk';

import { ECurrency } from 'modules/payments/types';
import { ONE_STRING, ZERO_STRING } from 'modules/common/constants/const';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { isStablecoin } from '../utils/isStablecoin';
import { selectPaymentOptionsByNetworkAndCurrency } from '../store/selectors';

export interface IFetchTokenPriceParams {
  currency: ECurrency;
  network: EBlockchain;
  // only needed to produce a unique cache key
  requestId?: string;
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchTokenPrice },
  useFetchTokenPriceQuery,
  useLazyFetchTokenPriceQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchTokenPrice: build.query<string, IFetchTokenPriceParams>({
      queryFn: createNotifyingQueryFn(
        async ({ currency, network }, { getState }) => {
          if (isStablecoin(currency)) {
            return { data: ONE_STRING };
          }

          const state = getState() as RootState;
          const { tokenAddress } = selectPaymentOptionsByNetworkAndCurrency(
            state,
            network,
            currency,
          );

          const chainId = ethNetworkIdByBlockchainMap[network];

          const price = await getTokenPriceByChainId(chainId, tokenAddress);

          return { data: price || ZERO_STRING };
        },
      ),
    }),
  }),
  overrideExisting: true,
});

export const {
  selectDataWithFallbackCachedByParams: selectTokenPrice,
  selectLoadingCachedByParams: selectTokenPriceLoading,
  selectStateCachedByParams: selectTokenPriceState,
} = createQuerySelectors({ endpoint: fetchTokenPrice, fallback: ZERO_STRING });

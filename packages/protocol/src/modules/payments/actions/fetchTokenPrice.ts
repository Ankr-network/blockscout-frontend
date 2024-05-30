import {
  EBlockchain,
  ethNetworkIdByBlockchainMap,
  getTokenPriceByChainId,
} from 'multirpc-sdk';

import { ECurrency } from 'modules/billing/types';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { isStableCoinCurrency } from 'modules/billing/utils/isStableCoinCurrency';
import { web3Api } from 'store/queries';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';

import { ONE_STRING, ZERO_STRING } from '../const';
import { selectPaymentOptionsByNetworkAndCurrency } from '../store/selectors';

export interface IFetchTokenPriceParams {
  currency: ECurrency;
  network: EBlockchain;
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchTokenPrice },
  useFetchTokenPriceQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchTokenPrice: build.query<string, IFetchTokenPriceParams>({
      queryFn: createNotifyingQueryFn(
        async ({ currency, network }, { getState }) => {
          if (isStableCoinCurrency(currency)) {
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

          return { data: price ?? ZERO_STRING };
        },
      ),
    }),
  }),
  overrideExisting: true,
});

export const {
  selectStateCachedByParams: selectTokenPriceState,
  selectDataWithFallbackCachedByParams: selectTokenPrice,
  selectLoadingCachedByParams: selectTokenPriceLoading,
} = createQuerySelectors({
  endpoint: fetchTokenPrice,
  fallback: ZERO_STRING,
});

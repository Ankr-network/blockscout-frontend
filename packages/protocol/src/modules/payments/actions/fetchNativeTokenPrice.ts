import {
  EBlockchain,
  ethNetworkIdByBlockchainMap,
  getTokenPriceByChainId,
} from 'multirpc-sdk';

import { ZERO_STRING } from 'modules/common/constants/const';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

export interface IFetchNativeTokenPriceParams {
  network: EBlockchain;
  // only needed to produce a unique cache key
  requestId?: string;
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchNativeTokenPrice },
  useFetchNativeTokenPriceQuery,
  useLazyFetchNativeTokenPriceQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchNativeTokenPrice: build.query<string, IFetchNativeTokenPriceParams>({
      queryFn: createNotifyingQueryFn(async ({ network }) => {
        const chainId = ethNetworkIdByBlockchainMap[network];

        const price = await getTokenPriceByChainId(chainId);

        return { data: price || ZERO_STRING };
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  selectDataWithFallbackCachedByParams: selectNativeTokenPrice,
  selectLoadingCachedByParams: selectNativeTokenPriceLoading,
  selectStateCachedByParams: selectNativeTokenPriceState,
} = createQuerySelectors({
  endpoint: fetchNativeTokenPrice,
  fallback: ZERO_STRING,
});

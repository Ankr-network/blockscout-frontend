import {
  AvailableWriteProviders,
  EthereumWeb3KeyProvider,
} from '@ankr.com/provider';
import { getTokenPriceByChainId } from 'multirpc-sdk';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { getProviderManager } from 'modules/api/getProviderManager';
import { web3Api } from 'store/queries';

import { ZERO_STRING } from '../store/const';

export const {
  endpoints: { fetchNativeTokenPrice },
  useFetchNativeTokenPriceQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchNativeTokenPrice: build.query<string, void>({
      queryFn: createNotifyingQueryFn(async () => {
        const provider =
          await getProviderManager().getProvider<EthereumWeb3KeyProvider>(
            AvailableWriteProviders.ethCompatible,
          );

        const price = await getTokenPriceByChainId(provider.currentChain);

        return {
          data: price ?? ZERO_STRING,
        };
      }),
    }),
  }),
  overrideExisting: true,
});

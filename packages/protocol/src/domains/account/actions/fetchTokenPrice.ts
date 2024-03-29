import {
  AvailableWriteProviders,
  EthereumWeb3KeyProvider,
} from '@ankr.com/provider';
import { getTokenPriceByChainId } from 'multirpc-sdk';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { getProviderManager } from 'modules/api/getProviderManager';
import { web3Api } from 'store/queries';

import { ZERO_STRING } from '../store/const';

export interface IFetchTokenPriceParams {
  tokenAddress?: string;
}

export const {
  endpoints: { fetchTokenPrice },
  useFetchTokenPriceQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchTokenPrice: build.query<string, IFetchTokenPriceParams>({
      queryFn: createNotifyingQueryFn(async ({ tokenAddress }) => {
        const provider =
          await getProviderManager().getProvider<EthereumWeb3KeyProvider>(
            AvailableWriteProviders.ethCompatible,
          );

        const price = await getTokenPriceByChainId(
          provider.currentChain,
          tokenAddress,
        );

        return {
          data: price ?? ZERO_STRING,
        };
      }),
    }),
  }),
  overrideExisting: true,
});

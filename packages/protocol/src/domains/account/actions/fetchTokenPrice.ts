import {
  EBlockchain,
  ethNetworkIdByBlockchainMap,
  getTokenPriceByChainId,
} from 'multirpc-sdk';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { ECurrency } from 'modules/billing/types';
import { isStableCoinCurrency } from 'modules/billing/utils/isStableCoinCurrency';

import { ONE_STRING, ZERO_STRING } from '../store/const';

export interface IFetchTokenPriceParams {
  currency?: ECurrency;
  network?: EBlockchain;
  tokenAddress?: string;
}

export const {
  endpoints: { fetchTokenPrice },
  useFetchTokenPriceQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchTokenPrice: build.query<string, IFetchTokenPriceParams>({
      queryFn: createNotifyingQueryFn(
        async ({ currency, network, tokenAddress }) => {
          if (isStableCoinCurrency(currency)) {
            return {
              data: ONE_STRING,
            };
          }

          const chainId =
            ethNetworkIdByBlockchainMap[network ?? EBlockchain.eth];

          const price = await getTokenPriceByChainId(chainId, tokenAddress);

          return {
            data: price ?? ZERO_STRING,
          };
        },
      ),
    }),
  }),
  overrideExisting: true,
});

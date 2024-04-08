import { getTokenPriceByChainId } from 'multirpc-sdk';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
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
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({ params: { tokenAddress }, web3Service }) => {
            const { currentChain } = web3Service.getKeyWriteProvider();

            const price = await getTokenPriceByChainId(
              currentChain,
              tokenAddress,
            );

            return {
              data: price ?? ZERO_STRING,
            };
          },
        ),
        fallback: { data: ZERO_STRING },
      }),
    }),
  }),
  overrideExisting: true,
});

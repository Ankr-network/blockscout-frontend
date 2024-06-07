import { ZERO_STRING } from 'modules/common/constants/const';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { getWalletBalanceAnkr } from '../utils/getWalletBalanceAnkr';

const fallback = ZERO_STRING;

export interface IFetchWalletBalanceAnkrParams {
  accountAddress: string;
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchWalletBalanceAnkr },
  useFetchWalletBalanceAnkrQuery,
  useLazyFetchWalletBalanceAnkrQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchWalletBalanceAnkr: build.query<string, IFetchWalletBalanceAnkrParams>({
      queryFn: async ({ accountAddress }) => {
        const data = await getWalletBalanceAnkr({ accountAddress });

        return { data };
      },
    }),
  }),
});

export const {
  selectDataWithFallbackCachedByParams: selectWalletBalanceAnkr,
  selectLoadingCachedByParams: selectWalletBalanceAnkrLoading,
  selectStateCachedByParams: selectWalletBalanceAnkrState,
} = createQuerySelectors({ endpoint: fetchWalletBalanceAnkr, fallback });

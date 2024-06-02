import { RequestType, web3Api } from 'store/queries';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';

import { ZERO_STRING } from '../const';
import { getWalletBalanceAnkr } from '../utils/getWalletBalanceAnkr';

const fallback = ZERO_STRING;

export const {
  endpoints: { fetchWalletBalanceAnkr },
  useFetchWalletBalanceAnkrQuery,
  useLazyFetchWalletBalanceAnkrQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchWalletBalanceAnkr: build.query<string, void>({
      providesTags: [RequestType.WalletANKRTokenBalance],
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: async ({ web3Service }) => {
          const { currentAccount } = web3Service.getKeyWriteProvider();

          if (!currentAccount) {
            return { data: ZERO_STRING };
          }

          const data = await getWalletBalanceAnkr({ web3Service });

          return { data };
        },
        fallback: { data: ZERO_STRING },
      }),
    }),
  }),
});

export const {
  selectState: selectWalletBalanceAnkrState,
  selectDataWithFallback: selectWalletBalanceAnkr,
  selectLoading: selectWalletBalanceAnkrLoading,
} = createQuerySelectors({ endpoint: fetchWalletBalanceAnkr, fallback });

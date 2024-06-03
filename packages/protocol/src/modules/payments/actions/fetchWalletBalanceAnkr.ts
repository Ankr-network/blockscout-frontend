import { ZERO_STRING } from 'modules/common/constants/const';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { getWalletBalanceAnkr } from '../utils/getWalletBalanceAnkr';

const fallback = ZERO_STRING;

export const {
  endpoints: { fetchWalletBalanceAnkr },
  useFetchWalletBalanceAnkrQuery,
  useLazyFetchWalletBalanceAnkrQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchWalletBalanceAnkr: build.query<string, void>({
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

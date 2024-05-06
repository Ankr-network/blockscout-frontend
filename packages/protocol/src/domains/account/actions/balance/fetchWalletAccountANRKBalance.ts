import { ZERO_STRING } from 'domains/account/store/const';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { RequestType, web3Api } from 'store/queries';
import { getCurrentAccountBalanceAnkr } from 'domains/account/utils/getCurrentAccountBalanceAnkr';

export const {
  endpoints: { fetchWalletAccountANKRBalance },
  useFetchWalletAccountANKRBalanceQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchWalletAccountANKRBalance: build.query<string, void>({
      providesTags: [RequestType.WalletANKRTokenBalance],
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: async ({ web3Service }) => {
          const { currentAccount } = web3Service.getKeyWriteProvider();

          if (!currentAccount) {
            return { data: ZERO_STRING };
          }

          const data = await getCurrentAccountBalanceAnkr({ web3Service });

          return { data };
        },
        fallback: { data: ZERO_STRING },
      }),
    }),
  }),
});

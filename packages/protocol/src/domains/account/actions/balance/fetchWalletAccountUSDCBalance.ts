import { Web3Address } from 'multirpc-sdk';

import { ZERO_STRING } from 'domains/account/store/const';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { RequestType, web3Api } from 'store/queries';

import { getCurrentAccountBalanceUSDC } from '../../utils/getCurrentAccountBalanceUSDC';

interface IFetchWalletAccountUSDCBalanceParams {
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
  tokenDecimals: number;
}

export const {
  endpoints: { fetchWalletAccountUSDCBalance },
  useFetchWalletAccountUSDCBalanceQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchWalletAccountUSDCBalance: build.query<
      string,
      IFetchWalletAccountUSDCBalanceParams
    >({
      providesTags: [RequestType.WalletUSDCTokenBalance],
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: async ({
          params: { depositContractAddress, tokenAddress, tokenDecimals },
          web3Service,
        }) => {
          const { currentAccount } = web3Service.getKeyWriteProvider();

          if (!currentAccount) {
            return { data: ZERO_STRING };
          }

          const data = await getCurrentAccountBalanceUSDC({
            web3Service,
            depositContractAddress,
            tokenAddress,
            tokenDecimals,
          });

          return { data };
        },
        fallback: { data: ZERO_STRING },
      }),
    }),
  }),
});

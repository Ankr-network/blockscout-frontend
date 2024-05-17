import { EBlockchain, Web3Address } from 'multirpc-sdk';

import { ZERO_STRING } from 'domains/account/store/const';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { RequestType, web3Api } from 'store/queries';

import { getCurrentAccountBalanceUSDC } from '../../utils/getCurrentAccountBalanceUSDC';

export interface IFetchWalletAccountUSDCBalanceParams {
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
  network: EBlockchain;
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
          params: {
            depositContractAddress,
            tokenAddress,
            tokenDecimals,
            network,
          },
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
            network,
            tokenDecimals,
          });

          return { data };
        },
        fallback: { data: ZERO_STRING },
      }),
    }),
  }),
});

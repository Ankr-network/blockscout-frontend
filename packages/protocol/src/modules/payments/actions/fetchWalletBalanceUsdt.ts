import { EBlockchain } from 'multirpc-sdk';

import { RootState } from 'store';
import { ZERO_STRING } from 'modules/common/constants/const';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { ECurrency } from '../types';
import { getWalletBalanceUsdt } from '../utils/getWalletBalanceUsdt';
import { selectPaymentOptionsByNetworkAndCurrency } from '../store/selectors';

export interface IFetchWalletBalanceUsdtParams {
  network: EBlockchain;
}

const currency = ECurrency.USDT;
const fallback = ZERO_STRING;

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchWalletBalanceUsdt },
  useFetchWalletBalanceUsdtQuery,
  useLazyFetchWalletBalanceUsdtQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchWalletBalanceUsdt: build.query<string, IFetchWalletBalanceUsdtParams>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: async ({ params: { network }, web3Service }, { getState }) => {
          const { currentAccount } = web3Service.getKeyWriteProvider();

          const { depositContractAddress, tokenAddress, tokenDecimals } =
            selectPaymentOptionsByNetworkAndCurrency(
              getState() as RootState,
              network,
              currency,
            );

          const hasNecessaryData =
            currentAccount &&
            depositContractAddress &&
            tokenAddress &&
            tokenDecimals;

          if (!hasNecessaryData) {
            return { data: fallback };
          }

          const data = await getWalletBalanceUsdt({
            depositContractAddress,
            network,
            tokenAddress,
            tokenDecimals,
            web3Service,
          });

          return { data };
        },
        fallback: { data: fallback },
      }),
    }),
  }),
});

export const {
  selectStateCachedByParams: selectWalletBalanceUsdtState,
  selectDataWithFallbackCachedByParams: selectWalletBalanceUsdt,
  selectLoadingCachedByParams: selectWalletBalanceUsdtLoading,
} = createQuerySelectors({ endpoint: fetchWalletBalanceUsdt, fallback });

import { EBlockchain } from 'multirpc-sdk';

import { RootState } from 'store';
import { ZERO_STRING } from 'modules/common/constants/const';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { ECurrency } from '../types';
import { getWalletBalanceUsdc } from '../utils/getWalletBalanceUsdc';
import { selectPaymentOptionsByNetworkAndCurrency } from '../store/selectors';

export interface IFetchWalletBalanceUsdcParams {
  network: EBlockchain;
}

const currency = ECurrency.USDC;
const fallback = ZERO_STRING;

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchWalletBalanceUsdc },
  useFetchWalletBalanceUsdcQuery,
  useLazyFetchWalletBalanceUsdcQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchWalletBalanceUsdc: build.query<string, IFetchWalletBalanceUsdcParams>({
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

          const data = await getWalletBalanceUsdc({
            depositContractAddress,
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
  selectStateCachedByParams: selectWalletBalanceUsdcState,
  selectDataWithFallbackCachedByParams: selectWalletBalanceUsdc,
  selectLoadingCachedByParams: selectWalletBalanceUsdcLoading,
} = createQuerySelectors({ endpoint: fetchWalletBalanceUsdc, fallback });

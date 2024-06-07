import { EBlockchain } from 'multirpc-sdk';

import { RootState } from 'store';
import { ZERO_STRING } from 'modules/common/constants/const';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { ECurrency } from '../types';
import { getWalletBalanceUsdt } from '../utils/getWalletBalanceUsdt';
import { selectPaymentOptionsByNetworkAndCurrency } from '../store/selectors';

export interface IFetchWalletBalanceUsdtParams {
  accountAddress: string;
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
      queryFn: async ({ accountAddress, network }, { getState }) => {
        const state = getState() as RootState;
        const { tokenAddress, tokenDecimals } =
          selectPaymentOptionsByNetworkAndCurrency(state, network, currency);

        const hasNecessaryData = tokenAddress && tokenDecimals;

        if (!hasNecessaryData) {
          return { data: fallback };
        }

        const data = await getWalletBalanceUsdt({
          accountAddress,
          network,
          tokenAddress,
          tokenDecimals,
        });

        return { data };
      },
    }),
  }),
});

export const {
  selectDataWithFallbackCachedByParams: selectWalletBalanceUsdt,
  selectLoadingCachedByParams: selectWalletBalanceUsdtLoading,
  selectStateCachedByParams: selectWalletBalanceUsdtState,
} = createQuerySelectors({ endpoint: fetchWalletBalanceUsdt, fallback });

import { EBlockchain, Web3Address } from 'multirpc-sdk';

import { RootState } from 'store';
import { ZERO_STRING } from 'modules/common/constants/const';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { ECurrency } from '../types';
import { getWalletBalanceUsdc } from '../utils/getWalletBalanceUsdc';
import { selectPaymentOptionsByNetworkAndCurrency } from '../store/selectors';

export interface IFetchWalletBalanceUsdcParams {
  address: Web3Address;
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
      queryFn: async ({ address, network }, { getState }) => {
        const { depositContractAddress, tokenAddress, tokenDecimals } =
          selectPaymentOptionsByNetworkAndCurrency(
            getState() as RootState,
            network,
            currency,
          );

        const hasNecessaryData =
          depositContractAddress && tokenAddress && tokenDecimals;

        if (!hasNecessaryData) {
          return { data: fallback };
        }

        const data = await getWalletBalanceUsdc({
          address,
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
  selectDataWithFallbackCachedByParams: selectWalletBalanceUsdc,
  selectLoadingCachedByParams: selectWalletBalanceUsdcLoading,
  selectStateCachedByParams: selectWalletBalanceUsdcState,
} = createQuerySelectors({ endpoint: fetchWalletBalanceUsdc, fallback });

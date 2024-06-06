import { EBlockchain, getBNWithDecimalsFromString } from 'multirpc-sdk';

import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { ECurrency } from '../types';
import { selectPaymentOptionsByNetworkAndCurrency } from '../store/selectors';

export interface IFetchAllowanceUsdtParams {
  network: EBlockchain;
}

const currency = ECurrency.USDT;
const fallback = 0;

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchAllowanceUsdt },
  useFetchAllowanceUsdtQuery,
  useLazyFetchAllowanceUsdtQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllowanceUsdt: build.query<number, IFetchAllowanceUsdtParams>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({ params: { network }, web3Service }, { getState }) => {
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

            const allowanceValue = await web3Service
              .getUsdtContractService({
                depositContractAddress,
                tokenAddress,
              })
              .getAllowanceValue({
                depositContractAddress,
                network,
                tokenAddress,
              });

            const hasAllowance = allowanceValue && !allowanceValue.isZero();

            if (!hasAllowance) {
              return { data: fallback };
            }

            return {
              data: Number(
                getBNWithDecimalsFromString(
                  allowanceValue.toFixed(),
                  tokenDecimals,
                ),
              ),
            };
          },
        ),
        fallback: { data: fallback },
      }),
    }),
  }),
});

export const {
  selectDataWithFallbackCachedByParams: selectAllowanceUsdt,
  selectLoadingCachedByParams: selectAllowanceUsdtLoading,
  selectStateCachedByParams: selectAllowanceUsdtState,
} = createQuerySelectors({ endpoint: fetchAllowanceUsdt, fallback });

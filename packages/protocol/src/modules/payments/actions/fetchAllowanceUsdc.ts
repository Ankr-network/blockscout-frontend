import { EBlockchain, getBNWithDecimalsFromString } from 'multirpc-sdk';

import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { ECurrency } from '../types';
import { selectPaymentOptionsByNetworkAndCurrency } from '../store/selectors';

export interface IFetchAllowanceUsdcParams {
  network: EBlockchain;
}

const currency = ECurrency.USDC;
const fallback = 0;

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchAllowanceUsdc },
  useFetchAllowanceUsdcQuery,
  useLazyFetchAllowanceUsdcQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllowanceUsdc: build.query<number, IFetchAllowanceUsdcParams>({
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
              .getUsdcContractService({
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
  selectStateCachedByParams: selectAllowanceUsdcState,
  selectDataWithFallbackCachedByParams: selectAllowanceUsdc,
  selectLoadingCachedByParams: selectAllowanceUsdcLoading,
} = createQuerySelectors({ endpoint: fetchAllowanceUsdc, fallback });

import BigNumber from 'bignumber.js';

import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { handleEstimateAllowanceFeeQuery } from '../utils/handleEstimateAllowanceFeeQuery';
import {
  selectCryptoTxById,
  selectPaymentOptionsByNetworkAndCurrency,
} from '../store/selectors';

export interface IEstimateAllowanceFeeUsdcParams {
  txId: string;
}

const fallback = 0;

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { estimateAllowanceFeeUsdc },
  useEstimateAllowanceFeeUsdcQuery,
  useLazyEstimateAllowanceFeeUsdcQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    estimateAllowanceFeeUsdc: build.query<
      number,
      IEstimateAllowanceFeeUsdcParams
    >({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({ params: { txId }, web3Service }, { getState }) => {
            const state = getState() as RootState;

            const tx = selectCryptoTxById(state, txId);

            if (tx) {
              const { amount, currency, network } = tx;

              const { currentAccount } = web3Service.getKeyWriteProvider();

              const { depositContractAddress, tokenAddress, tokenDecimals } =
                selectPaymentOptionsByNetworkAndCurrency(
                  state,
                  network,
                  currency,
                );

              const hasNecessaryData =
                currentAccount &&
                depositContractAddress &&
                tokenAddress &&
                tokenDecimals;

              if (hasNecessaryData) {
                const contractService = web3Service.getUsdcContractService({
                  depositContractAddress,
                  tokenAddress,
                });

                const fee = await contractService.getAllowanceFee({
                  amount: new BigNumber(amount),
                  depositContractAddress,
                  network,
                  tokenAddress,
                  tokenDecimals,
                });

                return { data: Number(fee) };
              }
            }

            return { data: fallback };
          },
        ),
        fallback: { data: fallback },
      }),
      onQueryStarted: async (
        { txId },
        { dispatch, getState, queryFulfilled },
      ) => {
        await handleEstimateAllowanceFeeQuery({
          dispatch,
          getState,
          queryFulfilled,
          txId,
        });
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  selectStateCachedByParams: selectEstimatedAllowanceFeeUsdcState,
  selectDataWithFallbackCachedByParams: selectEstimatedAllowanceFeeUsdc,
  selectLoadingCachedByParams: selectEstimatedAllowanceFeeUsdcLoading,
} = createQuerySelectors({ endpoint: estimateAllowanceFeeUsdc, fallback });

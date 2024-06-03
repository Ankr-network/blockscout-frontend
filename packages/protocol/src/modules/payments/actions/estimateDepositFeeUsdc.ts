import BigNumber from 'bignumber.js';

import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { getWalletBalanceUsdc } from '../utils/getWalletBalanceUsdc';
import { handleEstimateDepositFeeQuery } from '../utils/handleEstimateDepositFeeQuery';
import {
  selectCryptoTxById,
  selectPaymentOptionsByNetworkAndCurrency,
} from '../store/selectors';

export interface IEstimateDepositFeeUsdcParams {
  txId: string;
}

const fallback = 0;

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { estimateDepositFeeUsdc },
  useEstimateDepositFeeUsdcQuery,
  useLazyEstimateDepositFeeUsdcQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    estimateDepositFeeUsdc: build.query<number, IEstimateDepositFeeUsdcParams>({
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

              if (!hasNecessaryData) {
                return { data: fallback };
              }

              const balance = await getWalletBalanceUsdc({
                depositContractAddress,
                tokenAddress,
                tokenDecimals,
                web3Service,
              });

              if (Number(balance) >= amount) {
                const contractService = web3Service.getUsdcContractService({
                  depositContractAddress,
                  tokenAddress,
                });

                const fee = await contractService.getDepositUSDCToPAYGFee(
                  new BigNumber(amount),
                  depositContractAddress,
                  tokenDecimals,
                );

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
        await handleEstimateDepositFeeQuery({
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
  selectStateCachedByParams: selectEstimatedDepositFeeUsdcState,
  selectDataWithFallbackCachedByParams: selectEstimatedDepositFeeUsdc,
  selectLoadingCachedByParams: selectEstimatedDepositFeeUsdcLoading,
} = createQuerySelectors({ endpoint: estimateDepositFeeUsdc, fallback });

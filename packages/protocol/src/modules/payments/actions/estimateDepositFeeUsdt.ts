import BigNumber from 'bignumber.js';

import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { handleEstimateDepositFeeQuery } from '../utils/handleEstimateDepositFeeQuery';
import {
  selectCryptoTxById,
  selectPaymentOptionsByNetworkAndCurrency,
} from '../store/selectors';

export interface IEstimateDepositFeeUsdtParams {
  txId: string;
}

const fallback = 0;

export const {
  endpoints: { estimateDepositFeeUsdt },
  useEstimateDepositFeeUsdtQuery,
  useLazyEstimateDepositFeeUsdtQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    estimateDepositFeeUsdt: build.query<number, IEstimateDepositFeeUsdtParams>({
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

              const contractService = web3Service.getUsdtContractService({
                depositContractAddress,
                tokenAddress,
              });

              const fee = await contractService.getDepositUSDTToPAYGFee({
                amount: new BigNumber(amount),
                depositContractAddress,
                network,
                tokenAddress,
                tokenDecimals,
              });

              return { data: Number(fee) };
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
  selectStateCachedByParams: selectEstimatedDepositFeeUsdtState,
  selectDataWithFallbackCachedByParams: selectEstimatedDepositFeeUsdt,
  selectLoadingCachedByParams: selectEstimatedDepositFeeUsdtLoading,
} = createQuerySelectors({ endpoint: estimateDepositFeeUsdt, fallback });

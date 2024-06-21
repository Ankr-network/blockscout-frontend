import BigNumber from 'bignumber.js';

import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { createWeb3NotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
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
      queryFn: createWeb3NotifyingQueryFn(async ({ txId }, { getState }) => {
        const state = getState() as RootState;

        const tx = selectCryptoTxById(state, txId);

        if (tx) {
          const { amount, currency, from, network } = tx;

          const { depositContractAddress, tokenAddress, tokenDecimals } =
            selectPaymentOptionsByNetworkAndCurrency(state, network, currency);

          const hasNecessaryData =
            depositContractAddress && tokenAddress && tokenDecimals;

          if (!hasNecessaryData) {
            return { data: fallback };
          }

          const web3ReadService = await MultiService.getWeb3ReadService();

          const contractReadService =
            web3ReadService.getContractServiceUsdt(tokenAddress);

          const fee = await contractReadService.estimateDepositFee({
            amount: new BigNumber(amount),
            from,
            network,
            to: depositContractAddress,
            tokenDecimals,
          });

          return { data: Number(fee) };
        }

        return { data: fallback };
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
  selectDataWithFallbackCachedByParams: selectEstimatedDepositFeeUsdt,
  selectLoadingCachedByParams: selectEstimatedDepositFeeUsdtLoading,
  selectStateCachedByParams: selectEstimatedDepositFeeUsdtState,
} = createQuerySelectors({ endpoint: estimateDepositFeeUsdt, fallback });

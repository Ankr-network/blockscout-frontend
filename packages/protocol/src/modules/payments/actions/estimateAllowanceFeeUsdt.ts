import BigNumber from 'bignumber.js';

import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { handleEstimateAllowanceFeeQuery } from '../utils/handleEstimateAllowanceFeeQuery';
import {
  selectCryptoTxById,
  selectPaymentOptionsByNetworkAndCurrency,
} from '../store/selectors';

export interface IEstimateAllowanceFeeUsdtParams {
  txId: string;
}

const fallback = 0;

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { estimateAllowanceFeeUsdt },
  useEstimateAllowanceFeeUsdtQuery,
  useLazyEstimateAllowanceFeeUsdtQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    estimateAllowanceFeeUsdt: build.query<
      number,
      IEstimateAllowanceFeeUsdtParams
    >({
      queryFn: createNotifyingQueryFn(async ({ txId }, { getState }) => {
        const state = getState() as RootState;

        const tx = selectCryptoTxById(state, txId);

        if (tx) {
          const { amount, currency, from, network } = tx;

          const { depositContractAddress, tokenAddress, tokenDecimals } =
            selectPaymentOptionsByNetworkAndCurrency(state, network, currency);

          const hasNecessaryData =
            depositContractAddress && tokenAddress && tokenDecimals;

          if (hasNecessaryData) {
            const web3ReadService = await MultiService.getWeb3ReadService();

            const contractReadService =
              web3ReadService.getContractServiceUsdt(tokenAddress);

            const fee = await contractReadService.estimateAllowanceFee({
              amount: new BigNumber(amount),
              from,
              network,
              to: depositContractAddress,
              tokenDecimals,
            });

            return { data: Number(fee) };
          }
        }

        return { data: fallback };
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
  selectDataWithFallbackCachedByParams: selectEstimatedAllowanceFeeUsdt,
  selectLoadingCachedByParams: selectEstimatedAllowanceFeeUsdtLoading,
  selectStateCachedByParams: selectEstimatedAllowanceFeeUsdtState,
} = createQuerySelectors({ endpoint: estimateAllowanceFeeUsdt, fallback });

import BigNumber from 'bignumber.js';

import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
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
      queryFn: createNotifyingQueryFn(async ({ txId }, { getState }) => {
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

          const balance = await getWalletBalanceUsdc({
            accountAddress: from,
            depositContractAddress,
            network,
            tokenAddress,
            tokenDecimals,
          });

          if (Number(balance) >= amount) {
            const web3ReadService = await MultiService.getWeb3ReadService();

            const contractReadService =
              web3ReadService.getContractServiceUsdc(tokenAddress);

            const fee = await contractReadService.estimateDepositFee({
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
  selectDataWithFallbackCachedByParams: selectEstimatedDepositFeeUsdc,
  selectLoadingCachedByParams: selectEstimatedDepositFeeUsdcLoading,
  selectStateCachedByParams: selectEstimatedDepositFeeUsdcState,
} = createQuerySelectors({ endpoint: estimateDepositFeeUsdc, fallback });

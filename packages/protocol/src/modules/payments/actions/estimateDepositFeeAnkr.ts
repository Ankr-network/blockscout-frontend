import BigNumber from 'bignumber.js';
import { formatToWei } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { getWalletBalanceAnkr } from '../utils/getWalletBalanceAnkr';
import { handleEstimateDepositFeeQuery } from '../utils/handleEstimateDepositFeeQuery';
import { selectCryptoTxById } from '../store/selectors';

export interface IEstimateDepositFeeAnkrParams {
  txId: string;
}

const fallback = 0;

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { estimateDepositFeeAnkr },
  useEstimateDepositFeeAnkrQuery,
  useLazyEstimateDepositFeeAnkrQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    estimateDepositFeeAnkr: build.query<number, IEstimateDepositFeeAnkrParams>({
      queryFn: createNotifyingQueryFn(async ({ txId }, { getState }) => {
        const state = getState() as RootState;

        const tx = selectCryptoTxById(state, txId);

        if (tx) {
          const { amount, from } = tx;

          const balance = await getWalletBalanceAnkr({ accountAddress: from });

          if (Number(balance) >= amount) {
            const web3ReadService = await MultiService.getWeb3ReadService();

            const contractService = web3ReadService.getContractService();

            const fee = await contractService.estimateDepositFee(
              formatToWei(new BigNumber(amount)),
              from,
            );

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
  selectDataWithFallbackCachedByParams: selectEstimatedDepositFeeAnkr,
  selectLoadingCachedByParams: selectEstimatedDepositFeeAnkrLoading,
  selectStateCachedByParams: selectEstimatedDepositFeeAnkrState,
} = createQuerySelectors({ endpoint: estimateDepositFeeAnkr, fallback });

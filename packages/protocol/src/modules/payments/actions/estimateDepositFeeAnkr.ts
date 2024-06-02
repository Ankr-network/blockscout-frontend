import BigNumber from 'bignumber.js';
import { formatToWei } from 'multirpc-sdk';

import { RequestType, web3Api } from 'store/queries';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';

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
      providesTags: [RequestType.ANKRDepositFee],
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({ params: { txId }, web3Service }, { getState }) => {
            const state = getState() as RootState;

            const tx = selectCryptoTxById(state, txId);

            if (tx) {
              const { amount } = tx;
              const { currentAccount } = web3Service.getKeyWriteProvider();

              if (!currentAccount) {
                return { data: fallback };
              }

              const balance = await getWalletBalanceAnkr({ web3Service });

              if (Number(balance) >= amount) {
                const contractService = web3Service.getContractService();

                const fee = await contractService.getDepositAnkrToPAYGFee(
                  formatToWei(new BigNumber(amount)),
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
  selectStateCachedByParams: selectEstimatedDepositFeeAnkrState,
  selectDataWithFallbackCachedByParams: selectEstimatedDepositFeeAnkr,
  selectLoadingCachedByParams: selectEstimatedDepositFeeAnkrLoading,
} = createQuerySelectors({ endpoint: estimateDepositFeeAnkr, fallback });

import BigNumber from 'bignumber.js';
import { formatToWei } from 'multirpc-sdk';

import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { handleEstimateAllowanceFeeQuery } from '../utils/handleEstimateAllowanceFeeQuery';
import { selectCryptoTxById } from '../store/selectors';

export interface IEstimateAllowanceFeeAnkrParams {
  txId: string;
}

const fallback = 0;

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { estimateAllowanceFeeAnkr },
  useEstimateAllowanceFeeAnkrQuery,
  useLazyEstimateAllowanceFeeAnkrQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    estimateAllowanceFeeAnkr: build.query<
      number,
      IEstimateAllowanceFeeAnkrParams
    >({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({ params: { txId }, web3Service }, { getState }) => {
            const state = getState() as RootState;

            const tx = selectCryptoTxById(state, txId);

            if (tx) {
              const { amount } = tx;
              const { currentAccount } = web3Service.getKeyWriteProvider();

              if (currentAccount) {
                const contractService = web3Service.getContractService();

                const fee = await contractService.getAllowanceFee(
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
  selectStateCachedByParams: selectEstimatedAllowanceFeeAnkrState,
  selectDataWithFallbackCachedByParams: selectEstimatedAllowanceFeeAnkr,
  selectLoadingCachedByParams: selectEstimatedAllowanceFeeAnkrLoading,
} = createQuerySelectors({ endpoint: estimateAllowanceFeeAnkr, fallback });

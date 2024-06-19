import BigNumber from 'bignumber.js';
import { formatToWei } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
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
      queryFn: createNotifyingQueryFn(async ({ txId }, { getState }) => {
        const state = getState() as RootState;

        const tx = selectCryptoTxById(state, txId);

        if (tx) {
          const { amount, from } = tx;

          const web3ReadService = await MultiService.getWeb3ReadService();

          const contractService = web3ReadService.getContractService();

          const fee = await contractService.estimateAllowanceFee(
            formatToWei(new BigNumber(amount)),
            from,
          );

          return { data: Number(fee) };
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
  selectDataWithFallbackCachedByParams: selectEstimatedAllowanceFeeAnkr,
  selectLoadingCachedByParams: selectEstimatedAllowanceFeeAnkrLoading,
  selectStateCachedByParams: selectEstimatedAllowanceFeeAnkrState,
} = createQuerySelectors({ endpoint: estimateAllowanceFeeAnkr, fallback });

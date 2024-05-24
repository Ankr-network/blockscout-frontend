import BigNumber from 'bignumber.js';
import { EBlockchain, formatToWei } from 'multirpc-sdk';

import { RequestType, web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';

import { handleEstimateAllowanceFeeQuery } from '../utils/handleEstimateFeeQuery';

export interface IEstimateAnkrAllowanceToPaygFeeParams {
  amount: number;
  txId: string;
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { estimateAnkrAllowanceToPaygFee },
  useEstimateAnkrAllowanceToPaygFeeQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    estimateAnkrAllowanceToPaygFee: build.query<
      number,
      IEstimateAnkrAllowanceToPaygFeeParams
    >({
      providesTags: [RequestType.ANKRAllowanceFee],
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({ params: { amount }, web3Service }) => {
            const { currentAccount } = web3Service.getKeyWriteProvider();

            if (currentAccount) {
              const contractService = web3Service.getContractService();

              const fee = await contractService.getAllowanceFee(
                formatToWei(new BigNumber(amount)),
              );

              return { data: Number(fee) };
            }

            return { data: 0 };
          },
        ),
        fallback: { data: 0 },
      }),
      onQueryStarted: async (
        { txId },
        { dispatch, getState, queryFulfilled },
      ) => {
        await handleEstimateAllowanceFeeQuery({
          dispatch,
          getState,
          network: EBlockchain.eth,
          queryFulfilled,
          txId,
        });
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  selectStateCachedByParams: selectEstimatedAnkrAllowanceToPaygFeeState,
  selectDataWithFallbackCachedByParams: selectEstimatedAnkrAllowanceToPaygFee,
  selectLoadingCachedByParams: selectEstimatedAnkrAllowanceToPaygFeeLoading,
} = createQuerySelectors({
  endpoint: estimateAnkrAllowanceToPaygFee,
  fallback: 0,
});

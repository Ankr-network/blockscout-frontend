import BigNumber from 'bignumber.js';
import { EBlockchain } from 'multirpc-sdk';

import { RequestType, web3Api } from 'store/queries';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';

import { ECurrency } from '../types';
import { handleEstimateAllowanceFeeQuery } from '../utils/handleEstimateFeeQuery';
import { selectPaymentOptionsByNetworkAndCurrency } from '../store/selectors';

export interface IEstimateUsdcAllowanceToPaygFeeParams {
  amount: number;
  network: EBlockchain;
  txId: string;
}

const currency = ECurrency.USDC;

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { estimateUsdcAllowanceToPaygFee },
  useEstimateUsdcAllowanceToPaygFeeQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    estimateUsdcAllowanceToPaygFee: build.query<
      number,
      IEstimateUsdcAllowanceToPaygFeeParams
    >({
      providesTags: [RequestType.USDCAllowanceFee],
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async (
            { params: { amount, network }, web3Service },
            { getState },
          ) => {
            const { currentAccount } = web3Service.getKeyWriteProvider();

            const { depositContractAddress, tokenAddress, tokenDecimals } =
              selectPaymentOptionsByNetworkAndCurrency(
                getState() as RootState,
                network,
                currency,
              );

            const hasNecessaryData =
              currentAccount &&
              depositContractAddress &&
              tokenAddress &&
              tokenDecimals;

            if (hasNecessaryData) {
              const contractService = web3Service.getUsdcContractService({
                depositContractAddress,
                tokenAddress,
              });

              const fee = await contractService.getAllowanceFee(
                new BigNumber(amount),
                depositContractAddress,
                tokenDecimals,
              );

              return { data: Number(fee) };
            }

            return { data: 0 };
          },
        ),
        fallback: { data: 0 },
      }),
      onQueryStarted: async (
        { network, txId },
        { dispatch, getState, queryFulfilled },
      ) => {
        await handleEstimateAllowanceFeeQuery({
          dispatch,
          getState,
          network,
          queryFulfilled,
          txId,
        });
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  selectStateCachedByParams: selectEstimatedUsdcAllowanceToPaygFeeState,
  selectDataWithFallbackCachedByParams: selectEstimatedUsdcAllowanceToPaygFee,
  selectLoadingCachedByParams: selectEstimatedUsdcAllowanceToPaygFeeLoading,
} = createQuerySelectors({
  endpoint: estimateUsdcAllowanceToPaygFee,
  fallback: 0,
});

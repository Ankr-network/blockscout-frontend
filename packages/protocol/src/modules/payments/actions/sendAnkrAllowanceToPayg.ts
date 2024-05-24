import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';
import { formatToWei } from 'multirpc-sdk';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { web3Api } from 'store/queries';

import { handleAllowanceQuery } from '../utils/handleAllowanceQuery';

export interface ISendAnkrAllowanceToPaygParams {
  amount: number;
  txId: string;
}

export const {
  endpoints: { sendAnkrAllowanceToPayg },
  useSendAnkrAllowanceToPaygMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    sendAnkrAllowanceToPayg: build.mutation<
      IWeb3SendResult | null,
      ISendAnkrAllowanceToPaygParams
    >({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({ params: { amount }, web3Service }) => {
            const allowanceResponse = await web3Service
              .getContractService()
              .setAllowanceForPAYG(formatToWei(new BigNumber(amount)));

            return { data: allowanceResponse };
          },
        ),
        fallback: { data: null },
      }),
      onQueryStarted: async ({ txId }, { dispatch, queryFulfilled }) => {
        await handleAllowanceQuery({ dispatch, queryFulfilled, txId });
      },
    }),
  }),
  overrideExisting: true,
});

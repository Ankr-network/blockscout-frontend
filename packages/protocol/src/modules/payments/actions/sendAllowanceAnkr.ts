import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';
import { formatToWei } from 'multirpc-sdk';

import { RootState } from 'store';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createWeb3NotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { handleAllowanceQuery } from '../utils/handleAllowanceQuery';
import { selectCryptoTxById } from '../store/selectors';

export interface ISendAllowanceAnkrParams {
  txId: string;
}

export const {
  endpoints: { sendAllowanceAnkr },
  useSendAllowanceAnkrMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    sendAllowanceAnkr: build.mutation<
      IWeb3SendResult | null,
      ISendAllowanceAnkrParams
    >({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createWeb3NotifyingQueryFn(
          async ({ params: { txId }, web3Service }, { getState }) => {
            const state = getState() as RootState;

            const tx = selectCryptoTxById(state, txId);

            if (tx) {
              const { amount } = tx;

              const allowanceResponse = await web3Service
                .getContractService()
                .setAllowanceForPAYG(formatToWei(new BigNumber(amount)));

              return { data: allowanceResponse };
            }

            return { data: null };
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

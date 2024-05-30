import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';
import { formatToWei } from 'multirpc-sdk';

import { RootState } from 'store';
import { accountFetchPublicKey } from 'domains/account/actions/fetchPublicKey';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { web3Api } from 'store/queries';

import { handleDepositQuery } from '../utils/handleDepositQuery';
import { selectCryptoTxById } from '../store/selectors';

export interface IDepositAnkrParams {
  txId: string;
}

export const {
  endpoints: { depositAnkr },
  useDepositAnkrMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    depositAnkr: build.mutation<IWeb3SendResult | null, IDepositAnkrParams>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({ params: { txId }, web3Service }, { dispatch, getState }) => {
            const state = getState() as RootState;

            const tx = selectCryptoTxById(state, txId);

            if (tx) {
              const { amount } = tx;

              const publicKey = await dispatch(
                accountFetchPublicKey.initiate(),
              ).unwrap();

              const depositResponse = await web3Service
                .getContractService()
                .depositAnkrToPAYG(
                  formatToWei(new BigNumber(amount)),
                  publicKey,
                );

              return { data: depositResponse };
            }

            return { data: null };
          },
        ),
        fallback: { data: null },
      }),
      onQueryStarted: async ({ txId }, { queryFulfilled, dispatch }) => {
        await handleDepositQuery({ dispatch, queryFulfilled, txId });
      },
    }),
  }),
  overrideExisting: true,
});

import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';
import { formatToWei } from 'multirpc-sdk';

import { RootState } from 'store';
import { accountFetchPublicKey } from 'domains/account/actions/fetchPublicKey';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createWeb3NotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { handleDepositQuery } from '../utils/handleDepositQuery';
import { selectCryptoTxById } from '../store/selectors';

export interface IDepositAnkrForUserParams {
  txId: string;
}

export const {
  endpoints: { depositAnkrForUser },
  useDepositAnkrForUserMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    depositAnkrForUser: build.mutation<
      IWeb3SendResult | null,
      IDepositAnkrForUserParams
    >({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createWeb3NotifyingQueryFn(
          async ({ params: { txId }, web3Service }, { dispatch, getState }) => {
            const state = getState() as RootState;

            const tx = selectCryptoTxById(state, txId);

            if (tx) {
              const { accountAddress, amount } = tx;

              const publicKey = await dispatch(
                accountFetchPublicKey.initiate(),
              ).unwrap();

              const depositResponse = await web3Service
                .getContractService()
                .depositAnkrToPAYGForUser(
                  formatToWei(new BigNumber(amount)),
                  publicKey,
                  accountAddress,
                );

              return { data: depositResponse };
            }

            return { data: null };
          },
        ),
        fallback: { data: null },
      }),
      onQueryStarted: async ({ txId }, { dispatch, queryFulfilled }) => {
        await handleDepositQuery({ dispatch, queryFulfilled, txId });
      },
    }),
  }),
});

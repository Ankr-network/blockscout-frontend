import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';
import { formatToWei } from 'multirpc-sdk';

import { accountFetchPublicKey } from 'domains/account/actions/fetchPublicKey';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { web3Api } from 'store/queries';

import { handleDepositQuery } from '../utils/handleDepositQuery';

export interface IDepositAnkrToPaygParams {
  amount: number;
  txId: string;
}

export const {
  endpoints: { depostAnkrToPayg },
  useDepostAnkrToPaygMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    depostAnkrToPayg: build.mutation<
      IWeb3SendResult | null,
      IDepositAnkrToPaygParams
    >({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({ params: { amount }, web3Service }, { dispatch }) => {
            const publicKey = await dispatch(
              accountFetchPublicKey.initiate(),
            ).unwrap();

            const depositResponse = await web3Service
              .getContractService()
              .depositAnkrToPAYG(formatToWei(new BigNumber(amount)), publicKey);

            return { data: depositResponse };
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

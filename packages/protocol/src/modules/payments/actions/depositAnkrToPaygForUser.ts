import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';
import { Web3Address, formatToWei } from 'multirpc-sdk';

import { accountFetchPublicKey } from 'domains/account/actions/fetchPublicKey';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { web3Api } from 'store/queries';

import { handleDepositQuery } from '../utils/handleDepositQuery';

export interface IDepositAnkrToPaygForUserParams {
  amount: number;
  targetAddress: Web3Address;
  txId: string;
}

export const {
  endpoints: { depositAnkrToPaygForUser },
  useDepositAnkrToPaygForUserMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    depositAnkrToPaygForUser: build.mutation<
      IWeb3SendResult | null,
      IDepositAnkrToPaygForUserParams
    >({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async (
            { params: { amount, targetAddress }, web3Service },
            { dispatch },
          ) => {
            const publicKey = await dispatch(
              accountFetchPublicKey.initiate(),
            ).unwrap();

            const depositResponse = await web3Service
              .getContractService()
              .depositAnkrToPAYGForUser(
                formatToWei(new BigNumber(amount)),
                publicKey,
                targetAddress,
              );

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
});

import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';
import { Web3Address, formatToWei } from 'multirpc-sdk';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { setTopUpTransaction } from 'domains/account/store/accountTopUpSlice';
import { web3Api } from 'store/queries';

import { accountFetchPublicKey } from '../fetchPublicKey';

interface IDepositForUserRequestParams {
  amount: BigNumber;
  targetAddress: Web3Address;
}

export const {
  endpoints: { topUpDepositForUser },
  useLazyTopUpDepositForUserQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpDepositForUser: build.query<
      IWeb3SendResult | null,
      IDepositForUserRequestParams
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
                formatToWei(amount),
                publicKey,
                targetAddress,
              );

            return { data: depositResponse };
          },
        ),
        fallback: { data: null },
      }),
      onQueryStarted: async (
        { targetAddress },
        { dispatch, queryFulfilled },
      ) => {
        const { data: depositResponse } = await queryFulfilled;

        if (depositResponse?.transactionHash) {
          dispatch(
            setTopUpTransaction({
              address: targetAddress,
              topUpTransactionHash: depositResponse.transactionHash,
            }),
          );
        }
      },
    }),
  }),
});

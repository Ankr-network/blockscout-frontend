import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';
import { Web3Address, formatToWei } from 'multirpc-sdk';

import { createWeb3NotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { web3Api } from 'store/queries';

import { accountFetchPublicKey } from '../fetchPublicKey';
import { updateTxHash } from './utils/updateTxHash';

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
        queryFn: createWeb3NotifyingQueryFn(
          async (
            { params: { amount, targetAddress }, web3Service },
            { dispatch, getState },
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

            const txHash = depositResponse.transactionHash;

            updateTxHash({ dispatch, getState, txHash });

            return { data: depositResponse };
          },
        ),
        fallback: { data: null },
      }),
    }),
  }),
});

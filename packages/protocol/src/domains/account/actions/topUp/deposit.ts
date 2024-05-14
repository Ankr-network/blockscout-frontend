import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';
import { formatToWei } from 'multirpc-sdk';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { web3Api } from 'store/queries';

import { accountFetchPublicKey } from '../fetchPublicKey';
import { updateTxHash } from './utils/updateTxHash';

export const {
  endpoints: { topUpDeposit },
  useLazyTopUpDepositQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpDeposit: build.query<IWeb3SendResult | null, BigNumber>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({ params: amount, web3Service }, { getState, dispatch }) => {
            const publicKey = await dispatch(
              accountFetchPublicKey.initiate(),
            ).unwrap();

            const depositResponse = await web3Service
              .getContractService()
              .depositAnkrToPAYG(formatToWei(amount), publicKey);

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

import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';
import { Web3Address, formatToWei } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
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
      IWeb3SendResult,
      IDepositForUserRequestParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ amount, targetAddress }, { dispatch }) => {
          const service = MultiService.getWeb3Service();

          const publicKey = await dispatch(
            accountFetchPublicKey.initiate(),
          ).unwrap();

          const depositResponse = await service
            .getContractService()
            .depositAnkrToPAYGForUser(
              formatToWei(amount),
              publicKey,
              targetAddress,
            );

          return { data: depositResponse };
        },
      ),
      onQueryStarted: async (
        { targetAddress },
        { dispatch, queryFulfilled },
      ) => {
        const { data: depositResponse } = await queryFulfilled;

        if (depositResponse.transactionHash) {
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

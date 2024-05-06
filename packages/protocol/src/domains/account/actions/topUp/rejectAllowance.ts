import { IApiUserGroupParams } from 'multirpc-sdk';

import { GetState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';
import { setAllowanceTransaction } from 'domains/account/store/accountTopUpSlice';
import { web3Api } from 'store/queries';

import { fetchBalance } from '../balance/fetchBalance';
import { topUpCheckAllowanceTransaction } from './checkAllowanceTransaction';
import { topUpResetTransactionSliceAndRedirect } from './resetTransactionSliceAndRedirect';

export const {
  useLazyTopUpRejectAllowanceQuery,
  endpoints: { topUpRejectAllowance },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpRejectAllowance: build.query<boolean, IApiUserGroupParams>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({ web3Service }, { dispatch, getState }) => {
            const address = getCurrentTransactionAddress(getState as GetState);

            const rejectAllowanceResponse = await web3Service
              .getContractService()
              .rejectAllowanceForPAYG();

            const rejectAllowanceTransactionHash =
              rejectAllowanceResponse?.transactionHash;

            dispatch(
              setAllowanceTransaction({
                address,
                allowanceTransactionHash: rejectAllowanceTransactionHash,
              }),
            );

            await dispatch(
              topUpCheckAllowanceTransaction.initiate({
                initialTransactionHash: rejectAllowanceTransactionHash,
              }),
            );

            dispatch(topUpResetTransactionSliceAndRedirect.initiate());

            return { data: true };
          },
        ),
        fallback: { data: false },
      }),
      onQueryStarted: async ({ group }, { dispatch, queryFulfilled }) => {
        await queryFulfilled;

        dispatch(
          fetchBalance.initiate(
            { group },
            {
              subscribe: false,
              forceRefetch: true,
            },
          ),
        );
      },
    }),
  }),
});

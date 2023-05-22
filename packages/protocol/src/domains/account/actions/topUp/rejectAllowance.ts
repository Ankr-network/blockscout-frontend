import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { accountFetchBalance } from '../balance/fetchBalance';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { topUpResetTransactionSliceAndRedirect } from './resetTransactionSliceAndRedirect';
import { setAllowanceTransaction } from 'domains/account/store/accountTopUpSlice';
import { topUpCheckAllowanceTransaction } from './checkAllowanceTransaction';
import { web3Api } from 'store/queries';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';
import { IApiUserGroupParams } from 'multirpc-sdk';

export const {
  useLazyTopUpRejectAllowanceQuery,
  endpoints: { topUpRejectAllowance },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpRejectAllowance: build.query<boolean, IApiUserGroupParams>({
      queryFn: createNotifyingQueryFn(async (_args, { dispatch, getState }) => {
        const service = await MultiService.getWeb3Service();

        const address = await getCurrentTransactionAddress(
          getState as GetState,
        );

        const rejectAllowanceResponse = await service
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
          topUpCheckAllowanceTransaction.initiate(
            rejectAllowanceTransactionHash,
          ),
        );

        dispatch(topUpResetTransactionSliceAndRedirect.initiate());

        return { data: true };
      }),
      onQueryStarted: async ({ group }, { dispatch, queryFulfilled }) => {
        await queryFulfilled;

        dispatch(
          accountFetchBalance.initiate(
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

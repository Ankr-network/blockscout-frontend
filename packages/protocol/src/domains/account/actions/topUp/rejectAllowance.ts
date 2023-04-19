import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { accountFetchBalance } from '../balance/fetchBalance';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { resetTransactionSliceAndRedirect } from './resetTransactionSliceAndRedirect';
import { setRejectAllowanceTransaction } from 'domains/account/store/accountTopUpSlice';
import { topUpCheckAllowanceTransaction } from './checkAllowanceTransaction';
import { web3Api } from 'store/queries';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';

export const {
  useLazyTopUpRejectAllowanceQuery,
  endpoints: { topUpRejectAllowance },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpRejectAllowance: build.query<boolean, void>({
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
          setRejectAllowanceTransaction({
            address,
            rejectAllowanceTransactionHash,
          }),
        );

        await dispatch(
          topUpCheckAllowanceTransaction.initiate(
            rejectAllowanceTransactionHash,
          ),
        );

        resetTransactionSliceAndRedirect(
          dispatch,
          getState as GetState,
          address,
        );

        return { data: true };
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        await queryFulfilled;

        dispatch(
          accountFetchBalance.initiate(undefined, {
            subscribe: false,
            forceRefetch: true,
          }),
        );
      },
    }),
  }),
});

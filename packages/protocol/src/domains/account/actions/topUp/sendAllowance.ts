import BigNumber from 'bignumber.js';
import { formatToWei } from 'multirpc-sdk';

import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { topUpResetTransactionSliceAndRedirect } from './resetTransactionSliceAndRedirect';
import { setAllowanceTransaction } from 'domains/account/store/accountTopUpSlice';
import { topUpCheckAllowanceTransaction } from './checkAllowanceTransaction';
import { web3Api } from 'store/queries';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';

export const {
  useLazyTopUpSendAllowanceQuery,
  endpoints: { topUpSendAllowance },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpSendAllowance: build.query<boolean, BigNumber>({
      queryFn: createNotifyingQueryFn(
        async (amount, { dispatch, getState }) => {
          const service = await MultiService.getWeb3Service();

          const address = await getCurrentTransactionAddress(
            getState as GetState,
          );

          const allowanceResponse = await service
            .getContractService()
            .setAllowanceForPAYG(formatToWei(amount));

          const { transactionHash: allowanceTransactionHash } =
            allowanceResponse;

          dispatch(
            setAllowanceTransaction({
              address,
              allowanceTransactionHash,
            }),
          );

          const receipt = await dispatch(
            topUpCheckAllowanceTransaction.initiate(allowanceTransactionHash),
          ).unwrap();

          if (receipt) {
            dispatch(
              setAllowanceTransaction({
                address,
                allowanceTransactionHash: receipt.transactionHash,
              }),
            );
          } else {
            dispatch(topUpResetTransactionSliceAndRedirect.initiate());
          }

          return { data: true };
        },
      ),
    }),
  }),
});

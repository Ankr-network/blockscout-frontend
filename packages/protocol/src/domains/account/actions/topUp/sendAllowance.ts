import BigNumber from 'bignumber.js';
import { formatToWei } from 'multirpc-sdk';

import { GetState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import {
  setAllowanceTransaction,
  setApprovedAmount,
} from 'domains/account/store/accountTopUpSlice';
import { web3Api } from 'store/queries';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';

import { topUpCheckAllowanceTransaction } from './checkAllowanceTransaction';
import { topUpResetTransactionSliceAndRedirect } from './resetTransactionSliceAndRedirect';

export const {
  useLazyTopUpSendAllowanceQuery,
  endpoints: { topUpSendAllowance },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpSendAllowance: build.query<boolean, BigNumber>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({ params: amount, web3Service }, { dispatch, getState }) => {
            const address = getCurrentTransactionAddress(getState as GetState);

            const allowanceResponse = await web3Service
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

            /* saving approved amount for ongoing payments widget */
            dispatch(
              setApprovedAmount({
                address,
                approvedAmount: amount,
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
        fallback: { data: false },
      }),
    }),
  }),
});

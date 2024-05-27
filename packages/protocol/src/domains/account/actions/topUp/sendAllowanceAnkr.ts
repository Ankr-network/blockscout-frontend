import BigNumber from 'bignumber.js';
import { formatFromWei, formatToWei } from 'multirpc-sdk';

import { GetState } from 'store';
import { createWeb3NotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import {
  setAllowanceTransaction,
  setApprovedAmount,
} from 'domains/account/store/accountTopUpSlice';
import { web3Api } from 'store/queries';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';
import { ANKR_TOP_UP_NETWORK } from 'domains/account/const';

import { topUpCheckAllowanceTransaction } from './checkAllowanceTransaction';
import { topUpResetTransactionSliceAndRedirect } from './resetTransactionSliceAndRedirect';

export const {
  useLazyTopUpSendAllowanceAnkrQuery,
  endpoints: { topUpSendAllowanceAnkr },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpSendAllowanceAnkr: build.query<boolean, BigNumber>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createWeb3NotifyingQueryFn(
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

            const receipt = await dispatch(
              topUpCheckAllowanceTransaction.initiate({
                network: ANKR_TOP_UP_NETWORK,
                initialTransactionHash: allowanceTransactionHash,
              }),
            ).unwrap();

            if (receipt) {
              // get allowance for case when user has changed amount in metamask input
              const allowanceValue = await web3Service
                .getContractService()
                .getAllowanceValue();

              dispatch(
                setAllowanceTransaction({
                  address,
                  allowanceTransactionHash: receipt.transactionHash,
                }),
              );

              /* saving approved amount for ongoing payments widget */
              dispatch(
                setApprovedAmount({
                  address,
                  approvedAmount: new BigNumber(formatFromWei(allowanceValue)),
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

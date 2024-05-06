import BigNumber from 'bignumber.js';
import { getBNWithDecimalsFromString, Web3Address } from 'multirpc-sdk';

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

interface ISendAllowanceUsdcParams {
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
  tokenDecimals: number;
  confirmationBlocksNumber: number;
  amount: BigNumber;
}

export const {
  useLazyTopUpSendAllowanceUsdcQuery,
  endpoints: { topUpSendAllowanceUsdc },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpSendAllowanceUsdc: build.query<boolean, ISendAllowanceUsdcParams>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async (
            {
              params: {
                depositContractAddress,
                tokenAddress,
                tokenDecimals,
                confirmationBlocksNumber,
                amount,
              },
              web3Service,
            },
            { dispatch, getState },
          ) => {
            const address = getCurrentTransactionAddress(getState as GetState);

            const contractService = web3Service.getUsdcContractService({
              depositContractAddress,
              tokenAddress,
            });

            const allowanceResponse = await contractService.setAllowanceForPAYG(
              new BigNumber(amount),
              depositContractAddress,
              tokenAddress,
              tokenDecimals,
            );

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
                initialTransactionHash: allowanceTransactionHash,
                confirmationBlocksNumber,
              }),
            ).unwrap();

            if (receipt) {
              // get allowance for case when user has changed amount in metamask input
              const allowanceValue = await contractService.getAllowanceValue(
                tokenAddress,
              );

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
                  approvedAmount: getBNWithDecimalsFromString(
                    allowanceValue,
                    tokenDecimals,
                  ),
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

import BigNumber from 'bignumber.js';
import { getBNWithDecimalsFromString, Web3Address } from 'multirpc-sdk';

import { GetState } from 'store';
import { createWeb3NotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import {
  setAllowanceTransaction,
  setApprovedAmount,
} from 'domains/account/store/accountTopUpSlice';
import { web3Api } from 'store/queries';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';

import { topUpCheckAllowanceTransaction } from './checkAllowanceTransaction';
import { topUpResetTransactionSliceAndRedirect } from './resetTransactionSliceAndRedirect';

interface ISendAllowanceUsdtParams {
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
  tokenDecimals: number;
  confirmationBlocksNumber: number;
  amount: BigNumber;
}

export const {
  useLazyTopUpSendAllowanceUsdtQuery,
  endpoints: { topUpSendAllowanceUsdt },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpSendAllowanceUsdt: build.query<boolean, ISendAllowanceUsdtParams>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createWeb3NotifyingQueryFn(
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

            const contractService = web3Service.getUsdtContractService({
              depositContractAddress,
              tokenAddress,
            });

            const allowanceResponse = await contractService.setAllowanceForPAYG(
              {
                allowanceValue: new BigNumber(amount),
                depositContractAddress,
                tokenAddress,
                tokenDecimals,
              },
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

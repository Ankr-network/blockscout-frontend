import BigNumber from 'bignumber.js';

import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { resetTransactionSliceAndRedirect } from './resetTransactionSliceAndRedirect';
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
            .sendAllowanceForPAYG(amount);

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
            resetTransactionSliceAndRedirect(
              dispatch,
              getState as GetState,
              address,
            );
          }

          return { data: true };
        },
      ),
    }),
  }),
});

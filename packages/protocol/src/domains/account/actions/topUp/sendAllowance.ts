import BigNumber from 'bignumber.js';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { resetTransactionSliceAndRedirect } from './resetTransactionSliceAndRedirect';
import { setAllowanceTransaction } from 'domains/account/store/accountTopUpSlice';
import { topUpCheckAllowanceTransaction } from './checkAllowanceTransaction';
import { web3Api } from 'store/queries';

export const {
  useLazyTopUpSendAllowanceQuery,
  endpoints: { topUpSendAllowance },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpSendAllowance: build.query<boolean, BigNumber>({
      queryFn: createNotifyingQueryFn(async (amount, { dispatch }) => {
        const service = await MultiService.getWeb3Service();
        const provider = service.getKeyProvider();
        const { currentAccount: address } = provider;

        const allowanceResponse = await service
          .getContractService()
          .sendAllowanceForPAYG(amount);

        const { transactionHash: allowanceTransactionHash } = allowanceResponse;

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
          resetTransactionSliceAndRedirect(dispatch, address);
        }

        return { data: true };
      }),
    }),
  }),
});

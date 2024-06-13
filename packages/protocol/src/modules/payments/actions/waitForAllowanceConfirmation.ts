import { t } from '@ankr.com/common';

import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { isMetamaskError } from 'modules/common/utils/isMetamaskError';
import { isQueryReturnValue } from 'store/utils/isQueryReturnValue';
import { web3Api } from 'store/queries';

import { ALLOWANCE_CONFIRMATION_BLOCKS } from '../const';
import { selectCryptoTxById } from '../store/selectors';
import {
  setAllowanceError,
  setIsAllowanceConfirming,
  setIsApproved,
} from '../store/paymentsSlice';
import { waitForTxBlockConfirmation } from '../utils/waitForTxBlockConfirmation';

export interface IWaitForAllowanceConfirmationParams {
  txId: string;
}

export const {
  endpoints: { waitForAllowanceConfirmation },
  useWaitForAllowanceConfirmationMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    waitForAllowanceConfirmation: build.mutation<
      boolean,
      IWaitForAllowanceConfirmationParams
    >({
      queryFn: createNotifyingQueryFn(async ({ txId }, { getState }) => {
        const state = getState() as RootState;

        const tx = selectCryptoTxById(state, txId);
        const allowanceTxHash = tx?.allowanceTxHash;

        if (allowanceTxHash) {
          const { network } = tx;

          const isConfirmed = await waitForTxBlockConfirmation({
            blocksToConfirm: ALLOWANCE_CONFIRMATION_BLOCKS,
            network,
            txHash: allowanceTxHash,
          });

          return { data: isConfirmed };
        }

        return { data: false };
      }),
      onQueryStarted: async (
        { txId },
        { dispatch, getState, queryFulfilled },
      ) => {
        const state = getState() as RootState;
        const id = txId;

        const tx = selectCryptoTxById(state, id);

        if (tx) {
          try {
            const isAllowanceConfirming = true;

            dispatch(setIsAllowanceConfirming({ isAllowanceConfirming, id }));

            const { data: isApproved = false } = await queryFulfilled;

            dispatch(setIsApproved({ isApproved, id }));
          } catch (exception) {
            if (isQueryReturnValue(exception)) {
              const { error } = exception;

              const allowanceError =
                isMetamaskError(error) || error instanceof Error
                  ? error.message
                  : t('error.common');

              dispatch(setAllowanceError({ allowanceError, id: txId }));
            } else {
              throw exception;
            }
          } finally {
            const isAllowanceConfirming = false;

            dispatch(setIsAllowanceConfirming({ isAllowanceConfirming, id }));
          }
        }
      },
    }),
  }),
  overrideExisting: true,
});

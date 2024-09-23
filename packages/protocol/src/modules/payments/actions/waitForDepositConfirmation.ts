import { CONFIRMATION_BLOCKS } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { RootState } from 'store';
import { createWeb3NotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { isMetamaskError } from 'modules/common/utils/isMetamaskError';
import { isQueryReturnValue } from 'store/utils/isQueryReturnValue';
import { web3Api } from 'store/queries';

import {
  selectCryptoTxById,
  selectPaymentOptionsByNetworkAndCurrency,
} from '../store/selectors';
import {
  setDepositError,
  setIsConfirmed,
  setIsDepositConfirming,
} from '../store/paymentsSlice';
import { waitForTxBlockConfirmation } from '../utils/waitForTxBlockConfirmation';

export interface IWaitForDepositConfirmationParams {
  txId: string;
}

export const {
  endpoints: { waitForDepositConfirmation },
  useWaitForDepositConfirmationMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    waitForDepositConfirmation: build.mutation<
      boolean,
      IWaitForDepositConfirmationParams
    >({
      queryFn: createWeb3NotifyingQueryFn(async ({ txId }, { getState }) => {
        const state = getState() as RootState;

        const tx = selectCryptoTxById(state, txId);
        const depositTxHash = tx?.depositTxHash;

        if (depositTxHash) {
          const { currency, network } = tx;

          const { confirmationBlocksNumber } =
            selectPaymentOptionsByNetworkAndCurrency(state, network, currency);

          const blocksToConfirm =
            confirmationBlocksNumber || CONFIRMATION_BLOCKS;

          const isConfirmed = await waitForTxBlockConfirmation({
            blocksToConfirm,
            network,
            txHash: depositTxHash,
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
            const isDepositConfirming = true;

            dispatch(setIsDepositConfirming({ isDepositConfirming, id }));

            const { data: isConfirmed = false } = await queryFulfilled;

            dispatch(setIsConfirmed({ isConfirmed, id }));
          } catch (exception) {
            if (isQueryReturnValue(exception)) {
              const { error } = exception;

              const depositError =
                isMetamaskError(error) || error instanceof Error
                  ? error.message
                  : t('error.common');

              dispatch(setDepositError({ depositError, id: txId }));
            } else {
              throw exception;
            }
          } finally {
            const isDepositConfirming = false;

            dispatch(setIsDepositConfirming({ isDepositConfirming, id }));
          }
        }
      },
    }),
  }),
  overrideExisting: true,
});

import { CONFIRMATION_BLOCKS } from 'multirpc-sdk';

import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
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
  txHash: string;
  txId: string;
}

export const {
  endpoints: { waitForTxConfirmation },
  useWaitForTxConfirmationMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    waitForTxConfirmation: build.mutation<
      boolean,
      IWaitForDepositConfirmationParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ txHash, txId }, { getState }) => {
          const state = getState() as RootState;

          const tx = selectCryptoTxById(state, txId);

          if (tx) {
            const { currency, network } = tx;

            const { confirmationBlocksNumber } =
              selectPaymentOptionsByNetworkAndCurrency(
                state,
                network,
                currency,
              );

            const blocksToConfirm =
              confirmationBlocksNumber ?? CONFIRMATION_BLOCKS;

            const isConfirmed = await waitForTxBlockConfirmation({
              blocksToConfirm,
              network,
              txHash,
            });

            return { data: isConfirmed };
          }

          return { data: false };
        },
      ),
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
          } catch (error) {
            // TODO: handle properly
            const depositError = JSON.stringify(error);

            dispatch(setDepositError({ depositError, id }));

            throw error;
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

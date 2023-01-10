import { CONFIRMATION_BLOCKS } from 'multirpc-sdk';
import { TransactionReceipt } from 'web3-core';

import { AppDispatch, GetState } from 'store';
import { ETH_BLOCK_TIME } from './const';
import { MultiService } from 'modules/api/MultiService';
import { accountFetchBalance } from '../balance/fetchBalance';
import { getWeb3Instance } from 'modules/api/utils/getWeb3Instance';
import { selectAuthData } from 'domains/auth/store/authSlice';
import {
  selectTransaction,
  setTopUpTransaction,
} from 'domains/account/store/accountTopUpSlice';
import { t } from 'modules/i18n/utils/intl';
import { timeout } from 'modules/common/utils/timeout';
import { topUpFetchTransactionConfirmationStatus } from './fetchTransactionConfirmationStatus';
import { waitForPendingTransaction } from './waitForPendingTransaction';
import { web3Api } from 'store/queries';

export interface WaitTransactionConfirmingResult {
  error?: unknown;
}

const waitForBlocks = async (
  getState: GetState,
  dispatch: AppDispatch,
  transactionHash: string,
) => {
  let inProcess = true;

  while (inProcess) {
    const authData = selectAuthData(getState());

    if (!authData?.hasWeb3Connection) {
      break;
    }

    // eslint-disable-next-line
    const { data } = await dispatch(
      topUpFetchTransactionConfirmationStatus.initiate(transactionHash),
    );

    inProcess = !data?.isReady;

    if (inProcess) {
      // eslint-disable-next-line
      await timeout(ETH_BLOCK_TIME);
    }
  }
};

interface ReceiptResult {
  error?: unknown;
  receipt?: TransactionReceipt;
}

export const getReceipt = async (
  transactionHash: string,
): Promise<ReceiptResult> => {
  // wallet connect provider returns uncorrect status for transaction
  const web3 = getWeb3Instance();
  const receipt = await web3.eth.getTransactionReceipt(transactionHash);

  if (receipt && !receipt.status) {
    return { error: new Error(t('error.failed')) };
  }

  return { receipt };
};

export const {
  endpoints: { topUpWaitTransactionConfirming },
  useLazyTopUpWaitTransactionConfirmingQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpWaitTransactionConfirming: build.query<
      WaitTransactionConfirmingResult,
      void
    >({
      queryFn: async (_args, { getState, dispatch }) => {
        const state: any = getState();
        const service = await MultiService.getWeb3Service();
        const provider = service.getKeyProvider();
        const { currentAccount: address } = provider;

        const transaction = selectTransaction(state, address);

        const initialTransactionHash = transaction?.topUpTransactionHash;

        if (!initialTransactionHash) {
          // RTK Query does not allow to reset errors properly, so we have to
          // pass an error inside data object.
          return { data: { error: new Error(t('error.failed')) } };
        }

        // step 1: trying to take a receipt
        const { receipt: receipt1, error: receipt1Error } = await getReceipt(
          initialTransactionHash,
        );

        if (receipt1) {
          await waitForBlocks(
            getState as GetState,
            dispatch,
            initialTransactionHash,
          );

          return { data: {} };
        }

        if (receipt1Error) {
          return { data: { error: receipt1Error } };
        }

        // step 2: there're no receipt. we should wait
        await waitForPendingTransaction();

        // step 3: trying to take a receipt again
        let transactionHash = initialTransactionHash;

        const { receipt: receipt2, error: receipt2Error } = await getReceipt(
          transactionHash,
        );

        if (receipt2) {
          await waitForBlocks(getState as GetState, dispatch, transactionHash);

          return { data: {} };
        }

        if (receipt2Error) {
          return { data: { error: receipt2Error } };
        }

        // step 4: we already haven't had pending transaction and
        // a receipt too -> check the latest top up transaction
        const lastTopUpEvent = await service
          .getContractService()
          .getLastLockedFundsEvent(address);

        const currentBlockNumber = await provider
          .getWeb3()
          .eth.getBlockNumber();

        // step 5: check blocks difference. This is old top up transaction.
        // New top up transaction is failed or cancelled
        if (
          currentBlockNumber - (lastTopUpEvent?.blockNumber || 0) >
          CONFIRMATION_BLOCKS
        ) {
          // RTK Query does not allow to reset errors properly, so we have to
          // pass an error inside data object.
          return { data: { error: new Error(t('error.failed')) } };
        }

        if (
          lastTopUpEvent?.transactionHash &&
          lastTopUpEvent?.transactionHash !== initialTransactionHash
        ) {
          transactionHash = lastTopUpEvent.transactionHash;

          dispatch(
            setTopUpTransaction({
              address,
              topUpTransactionHash: transactionHash,
            }),
          );

          const { error } = await getReceipt(transactionHash);

          if (error) {
            return { data: { error } };
          }
        }

        await waitForBlocks(getState as GetState, dispatch, transactionHash);

        return { data: {} };
      },
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        await queryFulfilled;

        dispatch(accountFetchBalance.initiate(undefined));
      },
    }),
  }),
});

import {
  CONFIRMATION_BLOCKS,
  EBlockchain,
  IApiUserGroupParams,
} from 'multirpc-sdk';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';
import { TransactionReceipt } from 'web3-core';
import { t } from '@ankr.com/common';

import { AppDispatch, GetState } from 'store';
import { Definition } from 'store/queries/types';
import { MultiService } from 'modules/api/MultiService';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';
import { getWeb3Instance } from 'modules/api/utils/getWeb3Instance';
import { selectTransaction } from 'domains/account/store/selectors';
import { setTopUpTransaction } from 'domains/account/store/accountTopUpSlice';
import { timeout } from 'modules/common/utils/timeout';
import { RequestType, web3Api } from 'store/queries';

import { ETH_BLOCK_TIME } from './const';
import { fetchBalance } from '../balance/fetchBalance';
import { topUpFetchTransactionConfirmationStatus } from './fetchTransactionConfirmationStatus';
import { waitForPendingTransaction } from './waitForPendingTransaction';

export interface WaitTransactionConfirmingResult {
  error?: unknown;
}

const waitForBlocks = async (txHash: string, dispatch: AppDispatch) => {
  let inProcess = true;

  while (inProcess) {
    // eslint-disable-next-line
    const { data } = await dispatch(
      topUpFetchTransactionConfirmationStatus.initiate(txHash),
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
  network: EBlockchain,
  transactionHash: string,
): Promise<ReceiptResult> => {
  // wallet connect provider returns uncorrect status for transaction
  const web3 = getWeb3Instance(network);
  const receipt = await web3.eth.getTransactionReceipt(transactionHash);

  if (receipt && !receipt.status) {
    return { error: new Error(t('error.failed')) };
  }

  return { receipt };
};

type TxConfirmationResponse = Awaited<
  QueryActionCreatorResult<
    Definition<IApiUserGroupParams, WaitTransactionConfirmingResult>
  >
>;

const balancesTagsToInvalidate = [
  RequestType.WalletANKRTokenBalance,
  RequestType.WalletUSDTTokenBalance,
  RequestType.WalletUSDCTokenBalance,
];

export const hasTxConfirmationError = (response: TxConfirmationResponse) =>
  'data' in response &&
  typeof response.data === 'object' &&
  response.data !== null &&
  'error' in response.data;

export const {
  endpoints: { topUpWaitTransactionConfirming },
  useLazyTopUpWaitTransactionConfirmingQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpWaitTransactionConfirming: build.query<
      WaitTransactionConfirmingResult,
      IApiUserGroupParams
    >({
      queryFn: async (_args, { getState, dispatch }) => {
        const state = getState() as ReturnType<GetState>;
        const service = MultiService.getWeb3Service();
        const provider = service?.getKeyReadProvider();

        const address = getCurrentTransactionAddress(getState as GetState);

        const transaction = selectTransaction(state, address);
        const network = transaction?.network ?? EBlockchain.eth;

        const initialTransactionHash = transaction?.topUpTransactionHash;

        if (!initialTransactionHash) {
          // RTK Query does not allow to reset errors properly, so we have to
          // pass an error inside data object.

          return { data: { error: new Error(t('error.failed')) } };
        }

        // step 1: trying to take a receipt
        const { receipt: receipt1, error: receipt1Error } = await getReceipt(
          network,
          initialTransactionHash,
        );

        if (receipt1) {
          await waitForBlocks(initialTransactionHash, dispatch);

          return { data: {} };
        }

        if (receipt1Error) {
          return { data: { error: receipt1Error } };
        }

        // step 2: there're no receipt. we should wait
        await waitForPendingTransaction(network, address);

        // step 3: trying to take a receipt again
        let transactionHash = initialTransactionHash;

        const { receipt: receipt2, error: receipt2Error } = await getReceipt(
          network,
          transactionHash,
        );

        if (receipt2) {
          await waitForBlocks(transactionHash, dispatch);

          return { data: {} };
        }

        if (receipt2Error) {
          return { data: { error: receipt2Error } };
        }

        // step 4: we already haven't had pending transaction and
        // a receipt too -> check the latest top up transaction
        const lastTopUpEvent = await service
          ?.getContractService()
          .getLastLockedFundsEvent(address);

        const currentBlockNumber =
          (await provider?.getWeb3().eth.getBlockNumber()) ?? 0;

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

          const { error } = await getReceipt(network, transactionHash);

          if (error) {
            return { data: { error } };
          }
        }

        await waitForBlocks(transactionHash, dispatch);

        return { data: {} };
      },
      onQueryStarted: async ({ group }, { dispatch, queryFulfilled }) => {
        await queryFulfilled;

        dispatch(web3Api.util.invalidateTags(balancesTagsToInvalidate));
        dispatch(fetchBalance.initiate({ group }));
      },
    }),
  }),
});

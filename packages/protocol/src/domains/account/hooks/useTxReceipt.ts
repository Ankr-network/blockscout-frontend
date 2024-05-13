import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchTxReceiptParams,
  useFetchTxReceiptQuery,
} from '../actions/fetchTxReceipt';
import {
  selectTxReceipt,
  selectTxReceiptFetching,
  selectTxReceiptLoading,
} from '../store/selectors';

export interface IUseTxReceiptProps extends IFetchTxReceiptParams {
  skipFetching?: boolean;
}

export const useTxReceipt = ({
  skipFetching,
  txHash,
  network,
}: IUseTxReceiptProps) => {
  useFetchTxReceiptQuery(skipFetching ? skipToken : { txHash, network });

  const txReceipt = useAppSelector(state =>
    selectTxReceipt(state, txHash, network),
  );
  const isLoading = useAppSelector(state =>
    selectTxReceiptLoading(state, txHash, network),
  );
  const isFetching = useAppSelector(state =>
    selectTxReceiptFetching(state, txHash, network),
  );

  return { isFetching, isLoading, txReceipt };
};

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

export const useTxReceipt = ({ skipFetching, txHash }: IUseTxReceiptProps) => {
  useFetchTxReceiptQuery(skipFetching ? skipToken : { txHash });

  const txReceipt = useAppSelector(state => selectTxReceipt(state, txHash));
  const isLoading = useAppSelector(state =>
    selectTxReceiptLoading(state, txHash),
  );
  const isFetching = useAppSelector(state =>
    selectTxReceiptFetching(state, txHash),
  );

  return { isFetching, isLoading, txReceipt };
};

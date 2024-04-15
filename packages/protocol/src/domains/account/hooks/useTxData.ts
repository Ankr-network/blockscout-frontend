import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useAppSelector } from 'store/useAppSelector';

import {
  selectTxData,
  selectTxDataFetching,
  selectTxDataLoading,
} from '../store/selectors';
import {
  IFetchTxDataParams,
  useFetchTxDataQuery,
} from '../actions/fetchTxData';

export interface IUseTxDataProps extends IFetchTxDataParams {
  skipFetching?: boolean;
}

export const useTxData = ({ skipFetching, txHash }: IUseTxDataProps) => {
  useFetchTxDataQuery(skipFetching ? skipToken : { txHash });

  const txData = useAppSelector(state => selectTxData(state, txHash));
  const isLoading = useAppSelector(state => selectTxDataLoading(state, txHash));
  const isFetching = useAppSelector(state =>
    selectTxDataFetching(state, txHash),
  );

  return { isFetching, isLoading, txData };
};

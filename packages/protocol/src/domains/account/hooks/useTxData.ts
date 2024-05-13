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

export const useTxData = ({
  skipFetching,
  txHash,
  network,
}: IUseTxDataProps) => {
  useFetchTxDataQuery(skipFetching ? skipToken : { txHash, network });

  const txData = useAppSelector(state => selectTxData(state, txHash, network));
  const isLoading = useAppSelector(state =>
    selectTxDataLoading(state, txHash, network),
  );
  const isFetching = useAppSelector(state =>
    selectTxDataFetching(state, txHash, network),
  );

  return { isFetching, isLoading, txData };
};

import { useCallback } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { resetEndpoint } from 'store/utils/resetEndpoint';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAppSelector } from 'store/useAppSelector';

import {
  selectAllowanceAnkr,
  selectAllowanceAnkrLoading,
  useFetchAllowanceAnkrQuery,
  useLazyFetchAllowanceAnkrQuery,
  selectAllowanceAnkrState,
} from '../actions/fetchAllowanceAnkr';

export interface IUseFetchAllowanceAnkrProps extends IUseQueryProps {}

export const useFetchAllowanceAnkr = ({
  skipFetching,
}: IUseFetchAllowanceAnkrProps | void = {}) => {
  const { refetch: handleRefetchAllowanceAnkr } = useFetchAllowanceAnkrQuery(
    getQueryParams({ params: undefined, skipFetching }),
  );

  const [handleFetchAllowanceAnkr] = useLazyFetchAllowanceAnkrQuery();

  const { endpointName } = useAppSelector(selectAllowanceAnkrState);
  const allowanceAnkr = useAppSelector(selectAllowanceAnkr);
  const isLoading = useAppSelector(selectAllowanceAnkrLoading);

  const dispatch = useAppDispatch();
  const resetAlowanceFetchingAnkr = useCallback(
    () => resetEndpoint(endpointName, dispatch),
    [dispatch, endpointName],
  );

  return {
    allowanceAnkr,
    handleFetchAllowanceAnkr,
    handleRefetchAllowanceAnkr,
    isLoading,
    resetAlowanceFetchingAnkr,
  };
};

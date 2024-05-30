import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  selectAllowanceAnkr,
  selectAllowanceAnkrLoading,
  useFetchAllowanceAnkrQuery,
  useLazyFetchAllowanceAnkrQuery,
} from '../actions/fetchAllowanceAnkr';

export interface IUseFetchAllowanceAnkrProps extends IUseQueryProps {}

export const useFetchAllowanceAnkr = ({
  skipFetching,
}: IUseFetchAllowanceAnkrProps | void = {}) => {
  const { refetch: handleRefetchAllowanceAnkr } = useFetchAllowanceAnkrQuery(
    getQueryParams({ params: undefined, skipFetching }),
  );

  const [handleFetchAllowanceAnkr] = useLazyFetchAllowanceAnkrQuery();

  const ankrAllowance = useAppSelector(selectAllowanceAnkr);
  const isLoading = useAppSelector(selectAllowanceAnkrLoading);

  return {
    ankrAllowance,
    handleFetchAllowanceAnkr,
    handleRefetchAllowanceAnkr,
    isLoading,
  };
};

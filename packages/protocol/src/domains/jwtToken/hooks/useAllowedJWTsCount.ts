import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import {
  IFetchAllowedJWTsCountParams,
  selectAllowedJWTsCount,
  selectAllowedJWTsCountLoading,
  selectAllowedJWTsCountState,
  useFetchAllowedJWTsCountQuery,
  useLazyFetchAllowedJWTsCountQuery,
} from '../action/fetchAllowedJWTsCount';

export interface IUseAllowedJWTsCount
  extends IFetchAllowedJWTsCountParams,
    IUseQueryProps {}

export const useAllowedJWTsCount = ({
  group: externalGroup,
  skipFetching,
}: IUseAllowedJWTsCount) => {
  const { selectedGroupAddress } = useSelectedUserGroup();

  const group = externalGroup ?? selectedGroupAddress;

  const params = useMemo(
    (): IFetchAllowedJWTsCountParams => ({ group }),
    [group],
  );

  useFetchAllowedJWTsCountQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyFetchAllowedJWTsCountQuery();

  const handleFetchAllowedJWTsCount = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const allowedJWTsCount = useAppSelector(state =>
    selectAllowedJWTsCount(state, params),
  );
  const isLoading = useAppSelector(state =>
    selectAllowedJWTsCountLoading(state, params),
  );
  const allowedJWTsCountState = useAppSelector(state =>
    selectAllowedJWTsCountState(state, params),
  );

  return {
    allowedJWTsCount,
    allowedJWTsCountState,
    handleFetchAllowedJWTsCount,
    isLoading,
  };
};

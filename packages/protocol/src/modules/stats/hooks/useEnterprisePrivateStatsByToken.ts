import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchEnterprisePrivateStatsByTokenParams,
  selectEnterprisePrivateStatsByToken,
  selectEnterprisePrivateStatsByTokenLoading,
  selectEnterprisePrivateStatsByTokenState,
  useFetchEnterprisePrivateStatsByTokenQuery,
  useLazyFetchEnterprisePrivateStatsByTokenQuery,
} from '../actions/fetchEnterprisePrivateStatsByToken';
import { REFETCH_STATS_INTERVAL } from '../const';

export interface IUseEnterprisePrivateStatsByTokenProps
  extends IUseQueryProps,
    IFetchEnterprisePrivateStatsByTokenParams {}

export const useEnterprisePrivateStatsByToken = ({
  group,
  interval,
  skipFetching,
  token,
}: IUseEnterprisePrivateStatsByTokenProps) => {
  const params = useMemo(
    (): IFetchEnterprisePrivateStatsByTokenParams => ({
      group,
      interval,
      token,
    }),
    [group, interval, token],
  );

  useFetchEnterprisePrivateStatsByTokenQuery(
    getQueryParams({ params, skipFetching }),
    {
      refetchOnMountOrArgChange: REFETCH_STATS_INTERVAL,
    },
  );

  const [fetchLazy] = useLazyFetchEnterprisePrivateStatsByTokenQuery();

  const handleFetchEnterprisePrivateStatsByToken = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const privateStats = useAppSelector(state =>
    selectEnterprisePrivateStatsByToken(state, params),
  );

  const loading = useAppSelector(state =>
    selectEnterprisePrivateStatsByTokenLoading(state, params),
  );

  const state = useAppSelector(storeState =>
    selectEnterprisePrivateStatsByTokenState(storeState, params),
  );

  return {
    handleFetchEnterprisePrivateStatsByToken,
    loading,
    privateStats,
    state,
  };
};

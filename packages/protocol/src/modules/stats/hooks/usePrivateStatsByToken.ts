import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchPrivateStatsByTokenParams,
  selectPrivateStatsByToken,
  selectPrivateStatsByTokenLoading,
  selectPrivateStatsByTokenState,
  useFetchPrivateStatsByTokenQuery,
  useLazyFetchPrivateStatsByTokenQuery,
} from '../actions/fetchPrivateStatsByToken';
import { REFETCH_STATS_INTERVAL } from '../const';

export interface IUsePrivateStatsByTokenProps
  extends IUseQueryProps,
    IFetchPrivateStatsByTokenParams {}

export const usePrivateStatsByToken = ({
  group,
  interval,
  skipFetching,
  token,
}: IUsePrivateStatsByTokenProps) => {
  const params = useMemo(
    (): IFetchPrivateStatsByTokenParams => ({ group, interval, token }),
    [group, interval, token],
  );

  useFetchPrivateStatsByTokenQuery(getQueryParams({ params, skipFetching }), {
    refetchOnMountOrArgChange: REFETCH_STATS_INTERVAL,
  });

  const [fetchLazy] = useLazyFetchPrivateStatsByTokenQuery();

  const handleFetchPrivateStatsByToken = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const privateStats = useAppSelector(state =>
    selectPrivateStatsByToken(state, params),
  );

  const loading = useAppSelector(state =>
    selectPrivateStatsByTokenLoading(state, params),
  );

  const state = useAppSelector(storeState =>
    selectPrivateStatsByTokenState(storeState, params),
  );

  return { handleFetchPrivateStatsByToken, loading, privateStats, state };
};

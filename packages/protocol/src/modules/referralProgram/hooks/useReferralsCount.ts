import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchReferralsCountParams,
  selectReferralsCount,
  selectReferralsCountLoading,
  useFetchReferralsCountQuery,
  useLazyFetchReferralsCountQuery,
} from '../actions/fetchReferralsCount';

export interface IUseReferralsCountProps
  extends IUseQueryProps,
    IFetchReferralsCountParams {}

export const useReferralsCount = ({
  group,
  skipFetching = false,
}: IUseReferralsCountProps = {}) => {
  const params = useMemo(
    (): IFetchReferralsCountParams => ({ group }),
    [group],
  );

  useFetchReferralsCountQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyFetchReferralsCountQuery();

  const handleFetchReferralsCount = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const referralsCount = useAppSelector(state =>
    selectReferralsCount(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectReferralsCountLoading(state, params),
  );

  return { handleFetchReferralsCount, isLoading, referralsCount };
};

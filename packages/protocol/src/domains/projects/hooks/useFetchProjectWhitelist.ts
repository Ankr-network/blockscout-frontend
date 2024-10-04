import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  FetchProjectWhitelistParams,
  selectProjectWhitelist,
  selectProjectWhitelistLoading,
  useFetchProjectWhitelistQuery,
  useLazyFetchProjectWhitelistQuery,
} from '../actions/fetchProjectWhitelist';

export interface IUseFetchProjectWhitelistProps
  extends IUseQueryProps,
    FetchProjectWhitelistParams {}

export const useFetchProjectWhitelist = ({
  group,
  skipFetching = false,
  userEndpointToken,
}: IUseFetchProjectWhitelistProps) => {
  const params = useMemo(
    (): FetchProjectWhitelistParams => ({ group, userEndpointToken }),
    [group, userEndpointToken],
  );

  useFetchProjectWhitelistQuery(getQueryParams({ params, skipFetching }), {
    refetchOnMountOrArgChange: true,
  });

  const [fetchLazy] = useLazyFetchProjectWhitelistQuery();

  const handleFetchProjectWhitelist = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const projectWhitelist = useAppSelector(state =>
    selectProjectWhitelist(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectProjectWhitelistLoading(state, params),
  );

  return { handleFetchProjectWhitelist, isLoading, projectWhitelist };
};

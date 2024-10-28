import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchProjectWhitelistParams,
  selectProjectWhitelist,
  selectProjectWhitelistLoading,
  selectProjectWhitelistState,
  useFetchProjectWhitelistQuery,
  useLazyFetchProjectWhitelistQuery,
} from '../actions/fetchProjectWhitelist';

export interface IUseProjectWhitelistProps
  extends IUseQueryProps,
    IFetchProjectWhitelistParams {}

export const useProjectWhitelist = ({
  group,
  skipFetching = false,
  userEndpointToken,
}: IUseProjectWhitelistProps) => {
  const params = useMemo(
    (): IFetchProjectWhitelistParams => ({ group, userEndpointToken }),
    [group, userEndpointToken],
  );

  useFetchProjectWhitelistQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyFetchProjectWhitelistQuery();

  const handleFetchProjectWhitelist = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const projectWhitelist = useAppSelector(state =>
    selectProjectWhitelist(state, params),
  );

  const loading = useAppSelector(state =>
    selectProjectWhitelistLoading(state, params),
  );

  const state = useAppSelector(storeState =>
    selectProjectWhitelistState(storeState, params),
  );

  return { handleFetchProjectWhitelist, loading, projectWhitelist, state };
};

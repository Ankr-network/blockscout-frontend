import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import {
  FetchWhitelistsBlockchainsParams,
  selectWhitelistsBlockchains,
  selectWhitelistsBlockchainsLoading,
  selectWhitelistsBlockchainsState,
  useFetchWhitelistsBlockchainsQuery,
  useLazyFetchWhitelistsBlockchainsQuery,
} from '../actions/fetchWhitelistsBlockchains';

export interface IUseWhitelistsBlockchainsProps
  extends FetchWhitelistsBlockchainsParams,
    IUseQueryProps {}

export const useWhitelistsBlockchains = ({
  group: externalGroup,
  projects,
  skipFetching,
}: IUseWhitelistsBlockchainsProps) => {
  const { selectedGroupAddress } = useSelectedUserGroup();

  const group = externalGroup ?? selectedGroupAddress;

  const params = useMemo(
    (): FetchWhitelistsBlockchainsParams => ({ group, projects }),
    [group, projects],
  );

  useFetchWhitelistsBlockchainsQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyFetchWhitelistsBlockchainsQuery();

  const handleFetchWhitelistsBlockchains = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const whitelistsBlockchains = useAppSelector(state =>
    selectWhitelistsBlockchains(state, params),
  );
  const loading = useAppSelector(state =>
    selectWhitelistsBlockchainsLoading(state, params),
  );
  const whitelistsBlockchainsState = useAppSelector(state =>
    selectWhitelistsBlockchainsState(state, params),
  );

  return {
    handleFetchWhitelistsBlockchains,
    loading,
    state: whitelistsBlockchainsState,
    whitelistsBlockchains,
  };
};

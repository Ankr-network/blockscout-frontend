import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import {
  IFetchProjectWhitelistBlockchainsParams,
  selectProjectWhitelistBlockchains,
  selectProjectWhitelistBlockchainsLoading,
  selectProjectWhitelistBlockchainsState,
  useFetchProjectWhitelistBlockchainsQuery,
  useLazyFetchProjectWhitelistBlockchainsQuery,
} from '../actions/fetchProjectWhitelistBlockchains';

export interface IUseProjectWhitelistBlockchainsProps
  extends IFetchProjectWhitelistBlockchainsParams,
    IUseQueryProps {}

export const useProjectWhitelistBlockchains = ({
  group: externalGroup,
  skipFetching,
  token,
}: IUseProjectWhitelistBlockchainsProps) => {
  const { selectedGroupAddress } = useSelectedUserGroup();

  const group = externalGroup ?? selectedGroupAddress;

  const params = useMemo(
    (): IFetchProjectWhitelistBlockchainsParams => ({ group, token }),
    [group, token],
  );

  useFetchProjectWhitelistBlockchainsQuery(
    getQueryParams({ params, skipFetching }),
  );

  const [fetchLazy] = useLazyFetchProjectWhitelistBlockchainsQuery();

  const handleFetchProjectWhitelistBlockchains = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const projectWhitelistBlockchains = useAppSelector(state =>
    selectProjectWhitelistBlockchains(state, params),
  );
  const loading = useAppSelector(state =>
    selectProjectWhitelistBlockchainsLoading(state, params),
  );
  const state = useAppSelector(storeState =>
    selectProjectWhitelistBlockchainsState(storeState, params),
  );

  return {
    handleFetchProjectWhitelistBlockchains,
    loading,
    projectWhitelistBlockchains,
    state,
  };
};

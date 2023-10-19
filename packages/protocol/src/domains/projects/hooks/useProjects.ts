import { useEffect, useRef } from 'react';
import isEqual from 'lodash.isequal';

import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useLazyFetchAllJwtTokensStatusesQuery } from 'domains/jwtToken/action/getAllJwtTokensStatuses';

import { useLazyFetchAllWhitelistsQuery } from '../actions/fetchAllWhitelists';
import { useLazyFetchStatsByRangeQuery } from '../actions/fetchStatsByRange';
import { useLazyFetchWhitelistBlockchainsQuery } from '../actions/fetchWhitelistBlockchains';

export const useProjects = () => {
  const {
    jwtTokens,
    enableAddProject: canAddProject,
    allowedAddProjectTokenIndex,
    isLoading,
    isFetching,
  } = useJwtTokenManager();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const tokensRef = useRef(jwtTokens);

  const [
    fetchAllWhitelists,
    { data: allWhitelists, isLoading: isLoadingAllWhitelists },
  ] = useLazyFetchAllWhitelistsQuery();

  const [
    fetchAllWhitelistsBlockchains,
    {
      data: allWhitelistsBlockchains,
      isLoading: isLoadingAllWhitelistsBlockchains,
    },
  ] = useLazyFetchWhitelistBlockchainsQuery();

  const [fetchStatuses] = useLazyFetchAllJwtTokensStatusesQuery();

  const [fetchStatsByRange] = useLazyFetchStatsByRangeQuery();

  useEffect(() => {
    const skipFetching =
      jwtTokens.length === 0 ||
      isFetching ||
      isEqual(jwtTokens, tokensRef.current);

    if (skipFetching) {
      return () => {};
    }

    tokensRef.current = jwtTokens;

    const { abort: abortWhitelists } = fetchAllWhitelists({ group });

    const { abort: abortWhitelistsBlockchains } = fetchAllWhitelistsBlockchains(
      { group },
    );

    const { abort: abortStatuses } = fetchStatuses({
      group,
      projects: jwtTokens,
    });

    const { abort: abortStats } = fetchStatsByRange({
      group,
      jwtTokens,
    });

    return () => {
      abortWhitelists();
      abortWhitelistsBlockchains();
      abortStatuses();
      abortStats();
    };
  }, [
    isFetching,
    group,
    jwtTokens,
    fetchAllWhitelists,
    fetchAllWhitelistsBlockchains,
    fetchStatuses,
    fetchStatsByRange,
  ]);

  return {
    canAddProject,
    allowedAddProjectTokenIndex,
    isLoading,
    allWhitelists,
    isLoadingAllWhitelists,
    allWhitelistsBlockchains,
    isLoadingAllWhitelistsBlockchains,
    isFetching,
  };
};

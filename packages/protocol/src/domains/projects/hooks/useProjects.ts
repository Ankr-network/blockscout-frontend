import { useEffect, useRef } from 'react';
import isEqual from 'lodash.isequal';

import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useLazyFetchAllJwtTokensStatusesQuery } from 'domains/jwtToken/action/getAllJwtTokensStatuses';

import { useLazyFetchAllWhitelistsQuery } from '../actions/fetchAllWhitelists';

export const useProjects = () => {
  const {
    jwtTokens,
    enableAddProject: canAddProject,
    allowedAddProjectTokenIndex,
    isLoading,
    isFetching,
  } = useJwtTokenManager();

  const { selectedGroupAddress } = useSelectedUserGroup();

  const tokensRef = useRef(jwtTokens);

  const [fetchAllWhitelists] = useLazyFetchAllWhitelistsQuery();
  const [fetchAllJwtTokensStatuses] = useLazyFetchAllJwtTokensStatusesQuery();

  useEffect(() => {
    if (
      jwtTokens.length === 0 ||
      isFetching ||
      isEqual(jwtTokens, tokensRef.current)
    ) {
      return () => {};
    }

    tokensRef.current = jwtTokens;

    const { abort: abortWhitelists } = fetchAllWhitelists({
      group: selectedGroupAddress,
    });

    const { abort: abortJwtTokensStatuses } = fetchAllJwtTokensStatuses();

    return () => {
      abortWhitelists();
      abortJwtTokensStatuses();
    };
  }, [
    isFetching,
    selectedGroupAddress,
    jwtTokens,
    fetchAllWhitelists,
    fetchAllJwtTokensStatuses,
  ]);

  return {
    canAddProject,
    allowedAddProjectTokenIndex,
    isLoading,
  };
};

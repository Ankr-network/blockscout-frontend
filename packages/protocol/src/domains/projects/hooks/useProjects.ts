import { useEffect, useRef } from 'react';
import isEqual from 'lodash.isequal';

import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { useLazyFetchAllWhitelistsQuery } from '../actions/fetchAllWhitelists';

export const useProjects = () => {
  const {
    jwtTokens,
    enableAddProject: canAddProject,
    isLoading,
    isFetching,
  } = useJwtTokenManager();

  const { selectedGroupAddress } = useSelectedUserGroup();

  const tokensRef = useRef(jwtTokens);

  const [fetchAllWhitelists] = useLazyFetchAllWhitelistsQuery();

  useEffect(() => {
    if (
      jwtTokens.length === 0 ||
      isFetching ||
      isEqual(jwtTokens, tokensRef.current)
    ) {
      return () => {};
    }

    tokensRef.current = jwtTokens;

    const { abort } = fetchAllWhitelists({
      group: selectedGroupAddress,
    });

    return abort;
  }, [fetchAllWhitelists, isFetching, selectedGroupAddress, jwtTokens]);

  return {
    canAddProject,
    isLoading,
  };
};

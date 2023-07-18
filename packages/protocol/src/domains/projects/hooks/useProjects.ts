import { useEffect, useRef } from 'react';
import isEqual from 'lodash.isequal';

import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';
import { useLazyFetchWhitelistsQuery } from 'domains/projects/actions/fetchWhitelists';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useProjects = () => {
  const {
    jwtTokens,
    enableAddProject: canAddProject,
    isLoading,
    isFetching,
  } = useJwtTokenManager();

  const { selectedGroupAddress } = useSelectedUserGroup();

  const tokensRef = useRef(jwtTokens);

  const [fetchWhitelists] = useLazyFetchWhitelistsQuery();

  useEffect(() => {
    if (
      jwtTokens.length === 0 ||
      isFetching ||
      isEqual(jwtTokens, tokensRef.current)
    ) {
      return () => null;
    }

    tokensRef.current = jwtTokens;

    const { unsubscribe } = fetchWhitelists({
      group: selectedGroupAddress,
    });

    return unsubscribe;
  }, [fetchWhitelists, isFetching, selectedGroupAddress, jwtTokens]);

  return {
    canAddProject,
    isLoading,
  };
};

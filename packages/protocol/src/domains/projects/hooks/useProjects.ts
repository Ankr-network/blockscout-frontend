import { useEffect, useRef } from 'react';
import isEqual from 'lodash.isequal';

import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';
import { useLazyFetchWhitelistsQuery } from 'domains/projects/actions/fetchWhitelists';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useSearch } from 'modules/common/components/Search/hooks/useSearch';
import { usePermissionsAndRole } from 'domains/userGroup/hooks/usePermissionsAndRole';

export const useProjects = () => {
  const { jwtTokens, enableAddProject, isLoading, isFetching } =
    useJwtTokenManager();

  const { selectedGroupAddress } = useSelectedUserGroup();

  const { isDevRole } = usePermissionsAndRole();

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

  const [searchContent, setSearchContent] = useSearch();

  return {
    isDevRole,
    canAddProject: enableAddProject,
    isLoading,
    searchContent,
    setSearchContent,
  };
};

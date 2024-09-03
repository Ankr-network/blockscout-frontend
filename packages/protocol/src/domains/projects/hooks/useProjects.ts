import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useFetchAllJwtTokensStatusesQuery } from 'domains/jwtToken/action/getAllJwtTokensStatuses';
import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';

import { useFetchAllProjectsTotalRequestsForLastTwoDaysQuery } from '../actions/fetchAllProjectsTotalRequestsForLastTwoDays';
import { useFetchAllWhitelistsQuery } from '../actions/fetchAllWhitelists';
import { useFetchWhitelistsBlockchainsQuery } from '../actions/fetchWhitelistsBlockchains';
import { useProjectsDataParams } from './useProjectsDataParams';

export const useProjects = (skipWhitelistsFetching?: boolean) => {
  const {
    allowedAddProjectTokenIndex,
    enableAddProject: canAddProject,
    isFetching,
    isLoaded,
    isLoading,
    jwtTokens,
  } = useJwtTokenManager();

  const {
    allTotalRequestsParams,
    allWhitelistsBlockchainsParams,
    allWhitelistsParams,
    statusesParams,
  } = useProjectsDataParams({ jwts: jwtTokens, jwtsFetching: isFetching });

  const { data: allWhitelists, isLoading: isLoadingAllWhitelists } =
    useFetchAllWhitelistsQuery(
      skipWhitelistsFetching ? skipToken : allWhitelistsParams,
    );

  const {
    data: allWhitelistsBlockchains,
    isLoading: isLoadingAllWhitelistsBlockchains,
  } = useFetchWhitelistsBlockchainsQuery(allWhitelistsBlockchainsParams);

  useFetchAllJwtTokensStatusesQuery(statusesParams);

  useFetchAllProjectsTotalRequestsForLastTwoDaysQuery(allTotalRequestsParams);

  return {
    allWhitelists,
    allWhitelistsBlockchains,
    allowedAddProjectTokenIndex,
    canAddProject,
    isFetching,
    isLoaded,
    isLoading,
    isLoadingAllWhitelists,
    isLoadingAllWhitelistsBlockchains,
  };
};

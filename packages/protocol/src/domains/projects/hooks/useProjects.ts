import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useFetchAllJwtTokensStatusesQuery } from 'domains/jwtToken/action/getAllJwtTokensStatuses';
import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';

import { useFetchAllProjectsTotalRequestsForLastTwoDaysQuery } from '../actions/fetchAllProjectsTotalRequestsForLastTwoDays';
import { useFetchAllWhitelistsQuery } from '../actions/fetchAllWhitelists';
import { useFetchWhitelistsBlockchainsQuery } from '../actions/fetchWhitelistsBlockchains';
import { useProjectsDataParams } from './useProjectsDataParams';

interface IUseProjectsProps {
  skipWhitelistsFetching?: boolean;
  skipFetchingProjects?: boolean;
}

export const useProjects = ({
  skipFetchingProjects,
  skipWhitelistsFetching,
}: IUseProjectsProps) => {
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
      skipWhitelistsFetching || skipFetchingProjects
        ? skipToken
        : allWhitelistsParams,
      { refetchOnMountOrArgChange: true },
    );

  const {
    data: allWhitelistsBlockchains,
    isLoading: isLoadingAllWhitelistsBlockchains,
  } = useFetchWhitelistsBlockchainsQuery(
    skipFetchingProjects ? skipToken : allWhitelistsBlockchainsParams,
  );

  useFetchAllJwtTokensStatusesQuery(
    skipFetchingProjects ? skipToken : statusesParams,
  );

  useFetchAllProjectsTotalRequestsForLastTwoDaysQuery(
    skipFetchingProjects ? skipToken : allTotalRequestsParams,
    { refetchOnMountOrArgChange: true },
  );

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

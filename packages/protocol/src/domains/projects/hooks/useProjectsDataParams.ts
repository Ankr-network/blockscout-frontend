import isEqual from 'lodash.isequal';
import { IApiUserGroupParams } from 'multirpc-sdk';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useMemo, useRef } from 'react';

import { FetchTokenStatusParams } from 'domains/jwtToken/action/getAllJwtTokensStatuses';
import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { FetchAllProjectsTotalRequestsForLastTwoDaysParams } from '../actions/fetchAllProjectsTotalRequestsForLastTwoDays';
import { FetchWhitelistsBlockchainsParams } from '../actions/fetchWhitelistsBlockchains';

type SkipToken = typeof skipToken;

export interface ProjectsDataParams {
  allTotalRequestsParams:
    | FetchAllProjectsTotalRequestsForLastTwoDaysParams
    | SkipToken;
  allWhitelistsBlockchainsParams: FetchWhitelistsBlockchainsParams | SkipToken;
  allWhitelistsParams: IApiUserGroupParams | SkipToken;
  statusesParams: FetchTokenStatusParams | SkipToken;
}

export interface UseProjectsDataParams {
  jwts?: JWT[];
  jwtsFetching?: boolean;
}

export const useProjectsDataParams = ({
  jwts,
  jwtsFetching,
}: UseProjectsDataParams) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const jwtsRef = useRef(jwts);

  const projectsDataParams = useMemo(
    (): ProjectsDataParams => {
      const hasTokens = jwts && jwts.length > 0;
      const hasTokensChanged = isEqual(jwts, jwtsRef.current);

      const skipFetching = !hasTokens || jwtsFetching || hasTokensChanged;

      if (skipFetching) {
        return {
          allTotalRequestsParams: skipToken,
          allWhitelistsBlockchainsParams: skipToken,
          allWhitelistsParams: skipToken,
          statusesParams: skipToken,
        };
      }

      const projects = jwts;
      const tokens = jwts.map(jwt => jwt.userEndpointToken);

      return {
        allTotalRequestsParams: { group, tokens },
        allWhitelistsBlockchainsParams: { group, projects },
        allWhitelistsParams: { group },
        statusesParams: { group, projects },
      };
    },
    // we don't need to refetch data as soon as group changed, so this param
    // is excluded from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [jwts, jwtsFetching],
  );

  return projectsDataParams;
};

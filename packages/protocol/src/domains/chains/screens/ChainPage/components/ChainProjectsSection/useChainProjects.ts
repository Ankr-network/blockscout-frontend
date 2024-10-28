import { StatsByRangeDuration } from 'multirpc-sdk';
import { Timeframe } from '@ankr.com/chains-list';

import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { selectUserEndpointTokens } from 'domains/jwtToken/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useJWTsStatuses } from 'domains/jwtToken/hooks/useJWTsStatuses';
import { useProjectsTotalRequests } from 'domains/projects/hooks/useProjectsTotalRequests';
import { useProjectsWhitelistsBlockchains } from 'domains/projects/hooks/useProjectsWhitelistsBlockchains';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { useTimeframe } from '../ChainItemSections/hooks/useTimeframe';

export interface IUseChainProjectsProps {
  jwts: JWT[];
  jwtsLoading: boolean;
}

export const useChainProjects = ({
  jwts,
  jwtsLoading,
}: IUseChainProjectsProps) => {
  const { timeframe, timeframeTabs } = useTimeframe({
    initialTimeframe: Timeframe.Day,
    timeframes: [Timeframe.Hour, Timeframe.Day],
  });

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const userEndpointTokens = useAppSelector(state =>
    selectUserEndpointTokens(state, { group }),
  );

  const hasNoJWTs = jwts.length === 0;
  const skipFetching = hasNoJWTs || jwtsLoading;

  const { loading: jwtsStatusesLoading } = useJWTsStatuses({
    projects: jwts,
    group,
    skipFetching,
  });

  const { loading: whitelistsBlockchainsLoading } =
    useProjectsWhitelistsBlockchains({
      projects: jwts,
      group,
      skipFetching,
    });

  const { loading: projectsTotalRequestsLoading } = useProjectsTotalRequests({
    duration: StatsByRangeDuration.TWO_DAYS,
    group,
    skipFetching,
    tokens: userEndpointTokens,
  });

  const isLoading =
    whitelistsBlockchainsLoading ||
    jwtsStatusesLoading ||
    projectsTotalRequestsLoading;

  return { isLoading, timeframe, timeframeTabs };
};

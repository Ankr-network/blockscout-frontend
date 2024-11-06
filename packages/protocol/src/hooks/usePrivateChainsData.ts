import { ESortChainsType, Timeframe } from '@ankr.com/chains-list';
import { PrivateStats } from 'multirpc-sdk';
import { useState } from 'react';

import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePrivateChainsInfo } from 'hooks/usePrivateChainsInfo';
import { usePrivateStats } from 'modules/stats/hooks/usePrivateStats';
import { usePrivateStatsByToken } from 'modules/stats/hooks/usePrivateStatsByToken';
import { useSearch } from 'modules/common/components/Search/hooks/useSearch';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTimeframe } from 'domains/chains/screens/ChainPage/components/ChainItemSections/hooks/useTimeframe';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';

interface UsePrivateChainsDataParams {
  ignoreJwtManager?: boolean;
  timeframes?: Timeframe[];
}

const defaultUsePrivateChainsDataParams: UsePrivateChainsDataParams = {
  ignoreJwtManager: false,
};

const defaultPrivateStats: PrivateStats = {};

export const usePrivateChainsData = ({
  ignoreJwtManager: ignoreSelectedProject,
  timeframes,
} = defaultUsePrivateChainsDataParams) => {
  const { loading: isConnecting } = useAuth();

  const { timeframe, timeframeTabs } = useTimeframe({
    initialTimeframe: Timeframe.Day,
    timeframes,
  });

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { chains, isLoading: privateChainsLoading } = usePrivateChainsInfo();

  const { selectedProject } = useTokenManagerConfigSelector();

  const hasSelectedProject = Boolean(selectedProject);

  const interval = timeframeToIntervalMap[timeframe];

  const {
    loading: allProjectsStatsLoading,
    privateStats: { stats: allProjectsStats = defaultPrivateStats },
    state: { error: allProjectsStatsError },
  } = usePrivateStats({
    group,
    interval,
    skipFetching: !ignoreSelectedProject || hasSelectedProject,
  });

  const {
    loading: projectStatsLoading,
    privateStats: { stats: projectStats = defaultPrivateStats },
    state: { error: projectStatsError },
  } = usePrivateStatsByToken({
    group,
    interval,
    token: selectedProject!,
    skipFetching: ignoreSelectedProject || !hasSelectedProject,
  });

  const [stats, statsLoading, statsError] = ignoreSelectedProject
    ? [allProjectsStats, allProjectsStatsLoading, allProjectsStatsError]
    : [projectStats, projectStatsLoading, projectStatsError];

  const [sortType, setSortType] = useState(ESortChainsType.Trending);

  const [searchContent, setSearchContent] = useSearch();

  return {
    chains,
    loading: isConnecting || privateChainsLoading,
    searchContent,
    setSearchContent,
    setSortType,
    sortType,
    stats,
    statsError,
    statsLoading,
    timeframe,
    timeframeTabs,
  };
};

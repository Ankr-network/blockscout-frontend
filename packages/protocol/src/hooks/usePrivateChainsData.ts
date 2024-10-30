import { ESortChainsType, Timeframe } from '@ankr.com/chains-list';
import { useState } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { usePrivateStats } from 'domains/chains/hooks/usePrivateStats';
import { useSearch } from 'modules/common/components/Search/hooks/useSearch';
import { useTimeframe } from 'domains/chains/screens/ChainPage/components/ChainItemSections/hooks/useTimeframe';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { usePrivateChainsInfo } from 'hooks/usePrivateChainsInfo';

interface UsePrivateChainsDataParams {
  ignoreJwtManager?: boolean;
  timeframes?: Timeframe[];
}

const defaultUsePrivateChainsDataParams: UsePrivateChainsDataParams = {
  ignoreJwtManager: false,
};

const defaultPrivateStats = {};

export const usePrivateChainsData = ({
  ignoreJwtManager,
  timeframes,
} = defaultUsePrivateChainsDataParams) => {
  const { loading: isConnecting } = useAuth();

  const { timeframe, timeframeTabs } = useTimeframe({
    initialTimeframe: Timeframe.Day,
    timeframes,
  });

  const { chains, isLoading: privateChainsLoading } = usePrivateChainsInfo();

  const { selectedProject: userEndpointToken } =
    useTokenManagerConfigSelector();

  const {
    arePrivateStatsLoading: isLoading,
    data: { stats: privateStats = defaultPrivateStats },
    privateStatsError: error,
  } = usePrivateStats({
    hasGateway: false,
    interval: timeframeToIntervalMap[timeframe],
    userEndpointToken: ignoreJwtManager ? undefined : userEndpointToken,
  });

  const [sortType, setSortType] = useState<ESortChainsType>(
    ESortChainsType.Trending,
  );

  const [searchContent, setSearchContent] = useSearch();

  return {
    chains,
    loading: isConnecting || privateChainsLoading,
    setSortType,
    sortType,
    timeframe,
    timeframeTabs,
    searchContent,
    setSearchContent,
    isLoading,
    error,
    privateStats,
  };
};

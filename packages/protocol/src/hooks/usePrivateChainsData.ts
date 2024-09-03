import { useAuth } from 'domains/auth/hooks/useAuth';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { usePrivateStats } from 'domains/chains/hooks/usePrivateStats';
import { useSearch } from 'modules/common/components/Search/hooks/useSearch';
import { useTimeframe } from 'domains/chains/screens/ChainItem/components/ChainItemSections/hooks/useTimeframe';
import { Timeframe } from 'modules/chains/types';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { usePrivateChainsInfo } from 'hooks/usePrivateChainsInfo';
import { useSortType } from 'domains/chains/screens/ChainsListPage/hooks/useSortType';

interface UsePrivateChainsDataParams {
  ignoreJwtManager?: boolean;
  timeframes?: Timeframe[];
}

const defaultUsePrivateChainsDataParams: UsePrivateChainsDataParams = {
  ignoreJwtManager: false,
};

export const usePrivateChainsData = ({
  ignoreJwtManager,
  timeframes,
} = defaultUsePrivateChainsDataParams) => {
  const { loading: isConnecting } = useAuth();

  const { timeframe, timeframeTabs } = useTimeframe({
    initialTimeframe: Timeframe.Month,
    timeframes,
  });

  const {
    allChains,
    chains,
    isLoading: privateChainsLoading,
  } = usePrivateChainsInfo();

  const { selectedProject: userEndpointToken } =
    useTokenManagerConfigSelector();

  const { arePrivateStatsLoading: isLoading, privateStatsError: error } =
    usePrivateStats({
      interval: timeframeToIntervalMap[timeframe],
      userEndpointToken: ignoreJwtManager ? undefined : userEndpointToken,
    });

  const [sortType, setSortType] = useSortType();

  const [searchContent, setSearchContent] = useSearch();

  return {
    chains,
    allChains,
    loading: isConnecting || privateChainsLoading,
    setSortType,
    sortType,
    timeframe,
    timeframeTabs,
    searchContent,
    setSearchContent,
    isLoading,
    error,
  };
};

import { useAuth } from 'domains/auth/hooks/useAuth';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { usePrivateStats } from 'domains/chains/hooks/usePrivateStats';
import { usePrivateChainsInfo } from './usePrivateChainsInfo';
import { useSortType } from '../../../hooks/useSortType';
import { useSearch } from 'modules/common/components/Search/hooks/useSearch';
import { useTimeframe } from 'domains/chains/screens/ChainItem/components/ChainItemSections/hooks/useTimeframe';
import { Timeframe } from 'domains/chains/types';

export const usePrivateChainsData = () => {
  const { timeframe, timeframeTabs } = useTimeframe(Timeframe.Month);
  const { loading: isConnecting, hasWeb3Connection } = useAuth();

  const [privateChains, privateAllChains, privateChainsLoading] =
    usePrivateChainsInfo(hasWeb3Connection);

  usePrivateStats({
    interval: timeframeToIntervalMap[timeframe],
  });

  const [sortType, setSortType] = useSortType();

  const [searchContent, setSearchContent] = useSearch();

  return {
    chains: privateChains,
    allChains: privateAllChains,
    loading: isConnecting || privateChainsLoading,
    setSortType,
    sortType,
    timeframe,
    timeframeTabs,
    searchContent,
    setSearchContent,
  };
};
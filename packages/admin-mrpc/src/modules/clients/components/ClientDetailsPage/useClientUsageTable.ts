import { useCallback, useEffect, useState } from 'react';
import { BlockchainID, PrivateStats, PrivateStatsInterval } from 'multirpc-sdk';
import { IUserEntityMapped } from '../../actions/fetchUserStats';

export interface IHookProps {
  onUpdateTimeframe: (timeframe: PrivateStatsInterval) => void;
  stats?: PrivateStats;
  usage?: IUserEntityMapped[];
  currentPeriod: PrivateStatsInterval;
}

export interface IClientUsageTableProps extends IHookProps {
  isLoadingStats?: boolean;
}

type TabIndex = 0 | 1 | 2;
/* key is tab index, value is dayOffset param */
const timeframeParams: Record<TabIndex, PrivateStatsInterval> = {
  0: PrivateStatsInterval.DAY,
  1: PrivateStatsInterval.WEEK,
  2: PrivateStatsInterval.MONTH,
};

const TAB_INDEXES = Object.keys(timeframeParams);

export const useClientUsageTable = ({
  onUpdateTimeframe,
  stats,
  usage,
  currentPeriod,
}: IHookProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState<TabIndex>(0);
  const [filterByChainValue, setFilterByChainValue] =
    useState<BlockchainID | undefined>(undefined);

  useEffect(() => {
    setFilterByChainValue(undefined);
  }, [currentPeriod]);

  const handleChangeActiveTab = (
    event: React.ChangeEvent<any>,
    newTabIndex: TabIndex,
  ) => {
    onUpdateTimeframe(timeframeParams[newTabIndex]);
    setActiveTabIndex(newTabIndex);
  };

  const totalCost = usage?.reduce((accumulator, object) => {
    return accumulator + (object?.totalCost ? +object?.totalCost : 0);
  }, 0);

  const availableChains = [...new Set(usage?.map(item => item.blockchain))];

  const handleFilterByChain = (chain?: BlockchainID) => {
    return filterByChainValue === chain
      ? setFilterByChainValue('')
      : setFilterByChainValue(chain);
  };

  const dataToRender = filterByChainValue
    ? usage?.filter(i => i.blockchain === filterByChainValue)
    : usage;

  const compareBlockchainsTotalRequests = useCallback(
    (i: BlockchainID, j: BlockchainID): 1 | -1 | 0 => {
      if (!stats?.stats) {
        return 0;
      }
      if (!stats.stats[i]) {
        return 1;
      }
      if (!stats.stats[j]) {
        return -1;
      }
      const a = +stats.stats[i]!.totalRequests;
      const b = +stats.stats[j]!.totalRequests;

      if (a < b) {
        return 1;
      }
      if (a > b) {
        return -1;
      }
      return 0;
    },
    [stats?.stats],
  );

  const totalRequestsValue =
    filterByChainValue && stats?.stats && stats?.stats[filterByChainValue]
      ? stats?.stats[filterByChainValue]?.totalRequests
      : stats?.totalRequests;
  const totalCostsValue =
    filterByChainValue && stats?.stats && stats?.stats[filterByChainValue]
      ? stats?.stats[filterByChainValue]?.total?.totalCost
      : totalCost;

  const maxCountByBlockchain =
    dataToRender?.map(i => Math.max(...i.details.map(j => +j.count))) || [];
  const maxCountTotal = Math.max(...maxCountByBlockchain);

  return {
    activeTabIndex,
    handleChangeActiveTab,
    totalCost,
    filterByChainValue,
    availableChains: availableChains.sort(compareBlockchainsTotalRequests),
    handleFilterByChain,
    dataToRender,
    TAB_INDEXES,
    totalRequestsValue,
    totalCostsValue,
    maxCountTotal,
  };
};

import { useCallback, useEffect, useState } from 'react';
import invert from 'lodash.invert';
import {
  BlockchainID,
  IUsageDetailEntity,
  PrivateStats,
  PrivateStatsInterval,
} from 'multirpc-sdk';
import { IUsageEntityMapped } from 'modules/clients/types';
import { CustomRange } from '../useClientDetailsPage';

export interface IHookProps {
  onUpdateTimeframe: (timeframe: PrivateStatsInterval | CustomRange) => void;
  stats?: PrivateStats;
  usage?: IUsageEntityMapped[];
  currentPeriod: PrivateStatsInterval | CustomRange;
}

interface IUsageCsv extends IUsageDetailEntity {
  blockchain: BlockchainID;
}

export interface IClientUsageTableProps extends IHookProps {
  fileName: string;
  isLoadingStats?: boolean;
  handleSwitchCurrent: () => void;
  isCurrentDayIncluded: boolean;
  isRangePeriod: boolean;
}

type TabIndex = 0 | 1 | 2 | 3 | 4;
/* key is tab index, value is dayOffset param */
const timeframeByTabIndex: Record<
  TabIndex,
  PrivateStatsInterval | CustomRange
> = {
  0: PrivateStatsInterval.DAY,
  1: PrivateStatsInterval.WEEK,
  2: PrivateStatsInterval.MONTH,
  3: CustomRange.previous,
  4: CustomRange.current,
};

const tabIndexByTimeframe = invert(timeframeByTabIndex);

const TAB_INDEXES = Object.keys(timeframeByTabIndex);

export const useClientUsageTable = ({
  onUpdateTimeframe,
  stats,
  usage,
  currentPeriod,
}: IHookProps) => {
  const currentTimeframeTabIndex = +tabIndexByTimeframe[currentPeriod];
  const [activeTimeframeTabIndex, setActiveTimeframeTabIndex] =
    useState<TabIndex>(currentTimeframeTabIndex as TabIndex);

  const [filterByChainValue, setFilterByChainValue] =
    useState<BlockchainID | undefined>(undefined);

  useEffect(() => {
    setFilterByChainValue(undefined);
  }, [currentPeriod]);

  const handleChangeActiveTab = (
    event: React.ChangeEvent<any>,
    newTabIndex: TabIndex,
  ) => {
    onUpdateTimeframe(timeframeByTabIndex[newTabIndex]);
    setActiveTimeframeTabIndex(newTabIndex);
  };

  const totalCost = usage?.reduce((accumulator, usageEntity) => {
    return accumulator + (usageEntity?.totalCost ? +usageEntity?.totalCost : 0);
  }, 0);

  const csvMappedUsage = usage?.reduce(
    (acc: IUsageCsv[] | IUsageDetailEntity[], usageEntity) => {
      return [...acc, ...usageEntity.details];
    },
    [],
  );

  const availableChains = [
    ...new Set(usage?.map(usageEntity => usageEntity.blockchain)),
  ];

  const handleFilterByChain = (chain?: BlockchainID) => {
    return filterByChainValue === chain
      ? setFilterByChainValue('')
      : setFilterByChainValue(chain);
  };

  const dataToRender = filterByChainValue
    ? usage?.filter(
        usageEntity => usageEntity.blockchain === filterByChainValue,
      )
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
    dataToRender?.map(usageEntity =>
      Math.max(...usageEntity.details.map(usageDetail => +usageDetail.count)),
    ) || [];
  const maxCountTotal = Math.max(...maxCountByBlockchain);

  return {
    activeTimeframeTabIndex,
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
    csvMappedUsage,
  };
};

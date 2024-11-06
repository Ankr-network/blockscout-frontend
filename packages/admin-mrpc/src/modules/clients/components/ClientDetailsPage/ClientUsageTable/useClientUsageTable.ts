import { ChangeEvent, useEffect, useState } from 'react';
import invert from 'lodash.invert';
import {
  BlockchainID,
  IUsageDetailEntity,
  PrivateStatsInterval,
  PrivateStatsResponse,
} from 'multirpc-sdk';

import { IUsageEntityMapped } from 'modules/clients/types';
import { transformStatsToDetailedCsv } from 'modules/clients/utils/transformStatsToDetailedCsv';
import { compareBlockchainsTotalRequests } from 'modules/clients/utils/compareBlockchainsTotalRequests';

import { CustomRange } from '../useClientDetailsPage';
import { Timeframe } from '../RequestsChart/types';

export interface IHookProps {
  onUpdateTimeframe: (timeframe: PrivateStatsInterval | CustomRange) => void;
  stats?: PrivateStatsResponse;
  csvStats?: PrivateStatsResponse;
  usage?: IUsageEntityMapped[];
  currentPeriod: PrivateStatsInterval | CustomRange;
}

interface IUsageCsv extends IUsageDetailEntity {
  blockchain: BlockchainID;
}

export interface IClientUsageTableProps extends IHookProps {
  fileName: string;
  isLoadingStats?: boolean;
  isLoadingCsvStats?: boolean;
  handleSwitchCurrent: () => void;
  isCurrentDayIncluded: boolean;
  isRangePeriod: boolean;

  isChartDataLoading: boolean;
  timeframe: Timeframe;
  dateFrom: string;
  onChangeFrom: (event: ChangeEvent<HTMLInputElement>) => void;
  dateTo: string;
  onChangeTo: (event: ChangeEvent<HTMLInputElement>) => void;
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
  csvStats,
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

  const rawCsvData = csvStats?.stats
    ? transformStatsToDetailedCsv(csvStats.stats)
    : [];

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

  const totalRequestsValue =
    filterByChainValue && stats?.stats && stats?.stats[filterByChainValue]
      ? stats?.stats[filterByChainValue]?.total_requests
      : stats?.total_requests;

  const totalCostsValue =
    filterByChainValue && stats?.stats && stats?.stats[filterByChainValue]
      ? stats?.stats[filterByChainValue]?.total?.total_cost
      : totalCost;

  const maxCountByBlockchain =
    dataToRender?.map(usageEntity =>
      Math.max(...usageEntity.details.map(usageDetail => +usageDetail.count)),
    ) || [];
  const maxCountTotal = Math.max(...maxCountByBlockchain);

  /* chart data mapping */
  const totalStatsCount =
    stats?.stats &&
    Object.values(stats?.stats)
      .map(stat => stat?.counts)
      .reduce((accumulator, currentValue) => {
        return {
          ...accumulator,
          ...currentValue,
        };
      });

  const isStatsByChain =
    filterByChainValue && stats?.stats?.[filterByChainValue];

  const statsByChainCount = isStatsByChain
    ? stats?.stats![filterByChainValue]!.counts
    : totalStatsCount;

  const totalRequestsHistory = statsByChainCount
    ? Object.fromEntries(
        Object.entries(statsByChainCount).map(([timestamp, { count }]) => [
          timestamp,
          count,
        ]),
      )
    : undefined;

  return {
    activeTimeframeTabIndex,
    handleChangeActiveTab,
    totalCost,
    filterByChainValue,
    availableChains: availableChains.sort(
      compareBlockchainsTotalRequests(stats?.stats),
    ),
    handleFilterByChain,
    dataToRender,
    TAB_INDEXES,
    totalRequestsValue,
    totalCostsValue,
    maxCountTotal,
    csvMappedUsage,
    detailedCsvData: rawCsvData,
    totalRequestsHistory,
  };
};

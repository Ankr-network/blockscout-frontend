import { format, isBefore } from 'date-fns';

import { t } from '@ankr.com/common';
import { calculateTotalRequests } from 'modules/common/components/StakeBarChart/StakeBarChartUtils';
import {
  PrivateStatCount,
  PrivateStatOthersInfo,
  PrivateStatTopRequests,
  PrivateStatTopRequestsData,
  PrivateTotalRequestsInfo,
} from 'multirpc-sdk';
import { Timeframe } from '../types';
import {
  ONE_HOUR_LIFETIME,
  ONE_DAY_LIFETIME,
  getNextStatsTimestamp,
} from './timeframeUtils';

export type TopRequestsResultData = {
  list: string[];
  data: PrivateStatTopRequestsData[];
};

const UNKNOWN_NAME = 'unknown';

const fillBarCounts = (
  oneStakeCounts: Record<string, PrivateStatCount>,
  timestamp: number,
  topRequestsList: PrivateStatTopRequests[],
) => {
  const oneStakeItem = oneStakeCounts[timestamp];

  oneStakeCounts[timestamp] = {
    ...oneStakeItem,
    count: calculateTotalRequests(topRequestsList.map(item => item.count)),
    top_requests: topRequestsList?.map(item => {
      return {
        ...item,
        count: item.count,
      };
    }),
  };
};

interface ICount {
  timestamp: string;
  othersInfo: PrivateStatOthersInfo;
  topRequests: PrivateStatTopRequests[];
}

const calculateBarCounts = (
  timeframe: Timeframe,
  counts?: Record<string, PrivateStatCount>,
) => {
  if (!counts) return {};

  const oneStakeCounts: Record<string, PrivateStatCount> = {};
  const countList: ICount[] = [];
  const nextTime =
    timeframe === Timeframe.Day ? ONE_HOUR_LIFETIME : ONE_DAY_LIFETIME;

  Object.keys(counts).forEach(timestamp => {
    const item = counts[timestamp];
    countList.push({
      timestamp,
      othersInfo: item.others_info,
      topRequests: item.top_requests,
    });
  });

  countList.sort(
    (a: ICount, b: ICount) => Number(a.timestamp) - Number(b.timestamp),
  );

  let nextTimestamp = getNextStatsTimestamp(
    Number(countList[0].timestamp),
    timeframe,
  );
  let topRequestsList: PrivateStatTopRequests[] = [];

  countList.forEach((count: ICount, index: number) => {
    const { timestamp, topRequests = [] } = count;
    const isAfterTimestamp = !isBefore(
      new Date(Number(timestamp)),
      new Date(nextTimestamp),
    );

    if (isAfterTimestamp && topRequestsList.length > 0) {
      fillBarCounts(oneStakeCounts, nextTimestamp - nextTime, topRequestsList);

      nextTimestamp = getNextStatsTimestamp(Number(timestamp), timeframe);
      topRequestsList = [];
    }

    topRequests.forEach(topRequest => {
      const { method } = topRequest;
      const originTopRequest = topRequestsList.find(
        item => item.method === method,
      );

      if (originTopRequest) {
        originTopRequest.count += Number(topRequest.count);
      } else {
        topRequestsList.push({
          method,
          count: Number(topRequest.count),
          total_cost: topRequest?.total_cost,
        });
      }
    });

    if (index === countList.length - 1) {
      fillBarCounts(oneStakeCounts, nextTimestamp - nextTime, topRequestsList);
    }
  });

  return oneStakeCounts;
};

const getChartLabelFormat = (timeframe: Timeframe) => {
  switch (timeframe) {
    case Timeframe.Day:
    case Timeframe.Hour:
      return 'h:mmaaa';

    default:
      return 'LLL dd';
  }
};

const getTooltipTitleFormat = (timeframe: Timeframe) => {
  switch (timeframe) {
    case Timeframe.Day:
      return 'h:mmaaa, LLL dd';

    case Timeframe.Hour:
      return 'h:mmaaa';

    default:
      return 'LLL dd';
  }
};

export const formatChartData = (
  timeframe: Timeframe,
  total?: PrivateTotalRequestsInfo,
  counts?: Record<string, PrivateStatCount>,
) => {
  if (typeof counts === 'undefined') {
    return {
      listData: [],
      chartData: [],
    };
  }

  Object.keys(counts).forEach(timestamp => {
    counts?.[timestamp]?.top_requests?.map(({ method, ...item }) => ({
      ...item,
      method: method || UNKNOWN_NAME,
    }));
  });

  total?.top_requests?.map(({ method, ...item }) => ({
    ...item,
    method: method || UNKNOWN_NAME,
  }));

  const listData = (total?.top_requests || [])?.map(
    (item: PrivateStatTopRequests) => item.method,
  );
  const otherMethods = total?.others_info?.type_count ?? 0;
  let otherMethodName = '';

  if (otherMethods > 0) {
    otherMethodName = t('chain-item.method-calls.num-of-other-methods', {
      num: otherMethods,
    });
    listData.push(otherMethodName);

    Object.keys(counts).forEach(timestamp => {
      const item = counts?.[timestamp];

      const topRequests = [...(item?.top_requests || [])];

      const otherMethodItem = topRequests?.find(
        otherMethod => otherMethod?.method === otherMethodName,
      );

      if (!otherMethodItem && item?.others_info?.request_count) {
        topRequests.push({
          method: otherMethodName,
          count: item?.others_info?.request_count,
          total_cost: 0,
        });
      }

      if (counts) {
        counts = {
          ...counts,
          [timestamp]: {
            ...counts[timestamp],
            top_requests: topRequests,
          },
        };
      }
    });
  }

  if (timeframe === Timeframe.Day || timeframe === Timeframe.Week) {
    counts = calculateBarCounts(timeframe, counts);
  }

  const chartLabelFormat = getChartLabelFormat(timeframe);
  const toolTipTitleFormat = getTooltipTitleFormat(timeframe);

  const chartData: PrivateStatTopRequestsData[] = [];

  Object.keys(counts).forEach(timestamp => {
    const chart: Record<string, number> = {};

    counts?.[timestamp]?.top_requests?.forEach(item => {
      chart[item.method] = Number(item.count);
    });

    chartData.push({
      name: format(new Date(Number(timestamp)), chartLabelFormat),
      tooltipTitle: format(new Date(Number(timestamp)), toolTipTitleFormat),
      ...chart,
    });
  });

  return {
    listData,
    chartData,
  };
};

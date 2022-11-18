import {
  format,
  getDate,
  getHours,
  getMonth,
  getTime,
  getYear,
  isBefore,
} from 'date-fns';

import { t } from '@ankr.com/common';
import { calculateTotalRequests } from 'modules/common/components/StakeBarChart/StakeBarChartUtils';
import {
  IMethod,
  PrivateStatCount,
  PrivateStatOthersInfo,
  PrivateStatTopRequests,
  PrivateStatTopRequestsData,
  PrivateTotalRequestsInfo,
} from 'multirpc-sdk';
import { Timeframe } from '../types';

export type TopRequestsResultData = {
  list: string[];
  data: PrivateStatTopRequestsData[];
};

const ONE_HOUR = 60 * 60 * 1000;
const ONE_DAY = 24 * ONE_HOUR;

const UNKNOWN_NAME = 'unknown';

const getNextStatsTimestamp = (timeStamp: number, timeframe: Timeframe) => {
  const year = getYear(timeStamp);
  const month = getMonth(timeStamp);
  const day = getDate(timeStamp);
  const hour = getHours(timeStamp);

  return timeframe === Timeframe.Week
    ? getTime(new Date(year, month, day)) + ONE_DAY
    : getTime(new Date(year, month, day, hour)) + ONE_HOUR;
};

const fillBarCounts = (
  oneStakeCounts: Record<string, PrivateStatCount>,
  timestamp: number,
  topRequestsList: IMethod[],
) => {
  const oneStakeItem = oneStakeCounts[timestamp];

  oneStakeCounts[timestamp] = {
    ...oneStakeItem,
    count: calculateTotalRequests(topRequestsList.map(item => item.count)),
    top_requests: topRequestsList?.map(item => {
      return {
        ...item,
        count: String(item.count),
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
  const nextTime = timeframe === Timeframe.Day ? ONE_HOUR : ONE_DAY;

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
  let topRequestsList: IMethod[] = [];

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
          totalCost: topRequest?.totalCost,
        });
      }
    });

    if (index === countList.length - 1) {
      fillBarCounts(oneStakeCounts, nextTimestamp - nextTime, topRequestsList);
    }
  });

  return oneStakeCounts;
};

const getChartFormat = (timeframe: Timeframe) => {
  switch (timeframe) {
    case Timeframe.Day:
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
    counts?.[timestamp]?.top_requests?.map(item => {
      if (!item.method) {
        item.method = UNKNOWN_NAME;
      }

      return item;
    });
  });

  total?.top_requests?.map(item => {
    if (!item.method) {
      item.method = UNKNOWN_NAME;
    }

    return item;
  });

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

      const topRequests = item?.top_requests || [];

      const otherMethodItem = topRequests?.find(
        otherMethod => otherMethod?.method === otherMethodName,
      );

      if (!otherMethodItem && item?.others_info?.request_count) {
        topRequests.push({
          method: otherMethodName,
          count: `${item?.others_info?.request_count}`,
          totalCost: '',
        });
      }
    });
  }

  if (timeframe === Timeframe.Day || timeframe === Timeframe.Week) {
    counts = calculateBarCounts(timeframe, counts);
  }

  const chartFormat = getChartFormat(timeframe);

  const chartData: PrivateStatTopRequestsData[] = [];

  Object.keys(counts).forEach(timestamp => {
    const chart: Record<string, number> = {};

    counts?.[timestamp]?.top_requests?.forEach(item => {
      chart[item.method] = Number(item.count);
    });

    chartData.push({
      name: format(new Date(Number(timestamp)), chartFormat),
      ...chart,
    });
  });

  return {
    listData,
    chartData,
  };
};

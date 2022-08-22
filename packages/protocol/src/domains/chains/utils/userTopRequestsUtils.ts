import {
  IMethod,
  PrivateStatCount,
  PrivateStatTopRequests,
  PrivateTotalRequestsInfo,
  PrivateStatTopRequestsData,
  PrivateStatOthersInfo,
} from 'multirpc-sdk';
import {
  format,
  getDate,
  getHours,
  getMonth,
  getTime,
  getYear,
  isBefore,
} from 'date-fns';
import { StatsTimeframe } from '../types';
import { t } from 'common';
import { calculateTotalRequests } from 'modules/common/components/StakeBarChart/StakeBarChartUtils';

export type TopRequestsResultData = {
  list: string[];
  data: PrivateStatTopRequestsData[];
};

const ONE_HOUR = 60 * 60 * 1000;
const ONE_DAY = 24 * ONE_HOUR;

const UNKNOWN_NAME = 'unknown';

const getNextStatsTimestamp = (
  timeStamp: number,
  timeframe: StatsTimeframe,
) => {
  const year = getYear(timeStamp);
  const month = getMonth(timeStamp);
  const day = getDate(timeStamp);
  const hour = getHours(timeStamp);

  return timeframe === StatsTimeframe.WEEK
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
    top_requests: topRequestsList,
  };
};

interface ICount {
  timestamp: string;
  othersInfo: PrivateStatOthersInfo;
  topRequests: PrivateStatTopRequests[];
}

const calculateBarCounts = (
  timeframe: StatsTimeframe,
  counts?: Record<string, PrivateStatCount>,
) => {
  if (!counts) return {};

  const oneStakeCounts: Record<string, PrivateStatCount> = {};
  const countList: ICount[] = [];
  const nextTime = timeframe === StatsTimeframe.DAY ? ONE_HOUR : ONE_DAY;

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
        originTopRequest.count += topRequest.count;
      } else {
        topRequestsList.push({ method, count: topRequest.count });
      }
    });

    if (index === countList.length - 1) {
      fillBarCounts(oneStakeCounts, nextTimestamp - nextTime, topRequestsList);
    }
  });

  return oneStakeCounts;
};

export const formatChartData = (
  total: PrivateTotalRequestsInfo,
  timeframe: StatsTimeframe,
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

  const listData = total?.top_requests?.map(
    (item: PrivateStatTopRequests) => item.method,
  );
  const otherMethods = total.others_info?.type_count ?? 0;
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
      if (!otherMethodItem) {
        topRequests.push({
          method: otherMethodName,
          count: item?.others_info?.request_count ?? 0,
        });
      }
    });
  }

  if (timeframe !== StatsTimeframe.MONTH) {
    counts = calculateBarCounts(timeframe, counts);
  }

  const chartFormat = timeframe === StatsTimeframe.DAY ? 'h:mmaaa' : 'LLL dd';
  const chartData: PrivateStatTopRequestsData[] = [];

  Object.keys(counts).forEach(timestamp => {
    const chart: Record<string, number> = {};

    counts?.[timestamp]?.top_requests?.forEach(item => {
      chart[item.method] = item.count;
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

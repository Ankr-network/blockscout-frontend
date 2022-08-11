import { ITopRequest, TopRequestsData } from 'multirpc-sdk';
import { format } from 'date-fns';
import { StatsTimeframe } from '../types';

export type TopRequestsResultData = {
  list: string[];
  data: TopRequestsData[];
};

export const formatChartData = (
  counts: Record<string, ITopRequest>,
  timeframe: StatsTimeframe,
): TopRequestsData[] => {
  const chartData: TopRequestsData[] = [];
  const chartFormat =
    timeframe === StatsTimeframe.MONTH ? 'LLL dd' : 'haaa, LLL dd';

  Object.keys(counts).forEach(timeStamp => {
    const chart: Record<string, number> = {};

    counts[timeStamp]?.top_requests?.map(item => {
      if (typeof item.count === 'number') {
        chart[item.method] = item.count;
      }

      return chart;
    });

    chartData.push({
      name: format(new Date(Number(timeStamp)), chartFormat),
      ...chart,
    });
  });

  return chartData;
};

export const formatListData = (chartData: TopRequestsData[]): string[] => {
  const list: string[] = [];

  chartData.forEach((item: TopRequestsData) => {
    Object.keys(item).forEach(key => {
      if (key !== 'name') {
        list.push(key);
      }
    });
  });

  const listData = [...new Set(list)];

  return listData;
};

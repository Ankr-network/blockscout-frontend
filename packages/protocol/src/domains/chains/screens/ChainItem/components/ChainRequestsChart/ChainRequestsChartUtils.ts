import { IChartData } from 'modules/common/components/Chart';
import { RequestsLog } from './ChainRequestsChartTypes';
import { t } from 'modules/i18n/utils/intl';
import { Timeframe } from '@ankr.com/multirpc';

/* timeFrame in formatDate is used for chart labels view */
export const formatDate = (date: Date, timeFrame?: Timeframe): string => {
  const dateString = t('chain-item.chart.date', {
    value: date,
  });

  const timeString = t('chain-item.chart.time', {
    value: date,
  });

  if (timeFrame === '24h') {
    return timeString;
  }

  if (timeFrame === '7d') {
    return dateString;
  }

  if (timeFrame === '30d') {
    return dateString;
  }

  return `${dateString} ${timeString}`;
};

export const processData = (
  requestsLog: RequestsLog,
  timeframe: Timeframe,
): IChartData[] => {
  if (!requestsLog) return [];

  const rows = Object.entries(requestsLog);

  return rows
    .map((row, index) => {
      const [rowTime, callsCount] = row;

      const time = new Date(Number(rowTime));

      if (timeframe === '24h') {
        return {
          time,
          value: index <= rows.length - 3 ? callsCount : undefined,
          extraValue: index >= rows.length - 3 ? callsCount : undefined,
        };
      }

      return {
        time,
        value: callsCount,
      };
    })
    .sort((a, b) => a.time.getTime() - b.time.getTime());
};

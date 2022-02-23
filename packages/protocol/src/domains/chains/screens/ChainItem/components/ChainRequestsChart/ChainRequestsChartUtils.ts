import { IChartData } from 'modules/common/components/Chart';
import { RequestsLog } from './ChainRequestsChartTypes';
import { t } from 'modules/i18n/utils/intl';
import { Timeframe } from 'multirpc-sdk';

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

export const processData = (requestsLog: RequestsLog): IChartData[] => {
  if (!requestsLog) return [];

  const rows = Object.entries(requestsLog);

  return rows
    .map(row => {
      const [rowTime, callsCount] = row;

      return {
        time: new Date(Number(rowTime)),
        callsCount,
      };
    })
    .sort((a, b) => a.time.getTime() - b.time.getTime())
    .map((row, index) => {
      const { time, callsCount } = row;

      return {
        time,
        value: index <= rows.length - 3 ? callsCount : undefined,
        extraValue: index >= rows.length - 3 ? callsCount : undefined,
      };
    });
};

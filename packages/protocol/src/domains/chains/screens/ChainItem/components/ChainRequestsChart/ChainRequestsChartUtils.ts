import { IChartData } from 'modules/common/components/Chart';
import { RequestsLog } from './ChainRequestsChartTypes';
import { StatsTimeframe } from 'domains/chains/types';
import { t } from 'modules/i18n/utils/intl';

/* timeFrame in formatDate is used for chart labels view */
export const formatDate = (date: Date, timeFrame?: StatsTimeframe): string => {
  const dateString = t('chain-item.chart.date', {
    value: date,
  });

  const timeString = t('chain-item.chart.time', {
    value: date,
  });

  if (timeFrame === StatsTimeframe.DAY) {
    return timeString;
  }

  if (timeFrame === StatsTimeframe.WEEK) {
    return dateString;
  }

  if (timeFrame === StatsTimeframe.MONTH) {
    return dateString;
  }

  return `${dateString} ${timeString}`;
};

export const processData = (
  requestsLog: RequestsLog,
  isWalletConnected: boolean,
): IChartData[] => {
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

      if (isWalletConnected) {
        if (rows.length <= 1) {
          return {
            time,
            value: callsCount,
            extraValue: callsCount,
          };
        }

        return {
          time,
          value: index <= rows.length - 1 ? callsCount : undefined,
          extraValue: index >= rows.length - 1 ? callsCount : undefined,
        };
      }

      return {
        time,
        value: index <= rows.length - 3 ? callsCount : undefined,
        extraValue: index >= rows.length - 3 ? callsCount : undefined,
      };
    });
};

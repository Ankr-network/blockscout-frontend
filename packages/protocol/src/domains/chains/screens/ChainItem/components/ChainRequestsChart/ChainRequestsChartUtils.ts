import { IChartData } from 'modules/common/components/Chart';
import { RequestsLog } from './ChainRequestsChartTypes';
import { StatsTimeframe } from 'domains/chains/types';
import { t } from 'modules/i18n/utils/intl';

// offsets in ms
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;

const offsetsMap: Record<StatsTimeframe, number> = {
  [StatsTimeframe.DAY]: DAY,
  [StatsTimeframe.WEEK]: WEEK,
  [StatsTimeframe.MONTH]: MONTH,
};

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
  timeframe: StatsTimeframe,
): IChartData[] => {
  if (!requestsLog) return [];

  const rows = Object.entries(requestsLog);

  // to draw a line instead of a dot
  const additionalRow =
    rows.length === 1
      ? [[new Date().getTime() - offsetsMap[timeframe], 0]]
      : [];

  return [...additionalRow, ...rows]
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

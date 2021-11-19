import BigNumber from 'bignumber.js';

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

const THOUSAND = 1000;

export function formatCallsCount(value: number): string {
  const calls = new BigNumber(value);

  if (calls.isGreaterThanOrEqualTo(THOUSAND) && calls.isLessThan(1e6)) {
    return `${calls.dividedBy(THOUSAND).toFixed()}k`;
  }

  if (calls.isGreaterThanOrEqualTo(1e6) && calls.isLessThan(1e9)) {
    return `${calls.dividedBy(THOUSAND * THOUSAND).toFixed()}m`;
  }

  if (calls.isGreaterThanOrEqualTo(1e9) && calls.isLessThan(1e12)) {
    return `${calls.dividedBy(1e9).toFixed()}b`;
  }

  if (calls.isGreaterThanOrEqualTo(1e12) && calls.isLessThan(1e15)) {
    return `${calls.dividedBy(1e12).toFixed()}t`;
  }

  return calls.toFixed();
}

export const processData = (requestsLog: RequestsLog): IChartData[] => {
  if (!requestsLog) return [];

  return Object.entries(requestsLog)
    .map(row => {
      const [rowTime, callsCount] = row;

      const time = new Date(Number(rowTime));

      const data: IChartData = {
        time,
        value: callsCount,
      };

      return data;
    })
    .sort((a, b) => a.time.getTime() - b.time.getTime());
};

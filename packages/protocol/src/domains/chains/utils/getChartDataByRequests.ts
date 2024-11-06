import { BlockchainStatsTimestamp } from 'multirpc-sdk';
import { Timeframe } from '@ankr.com/chains-list';

import { IChartData } from 'modules/common/components/Chart';
import { getEmptyChartData } from 'modules/common/components/RequestsChart/utils/getEmptyChartDataByTimeframe';

const { Day, Hour, Month, Week } = Timeframe;

// offsets in ms
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;

const offsetsMap: Record<Timeframe, number> = {
  [Hour]: HOUR,
  [Day]: DAY,
  [Week]: WEEK,
  [Month]: MONTH,
};

export interface GetChartDataByRequestsParams {
  isLoggedIn?: boolean;
  requests?: Record<BlockchainStatsTimestamp, number>;
  shouldShowZeroValues?: boolean;
  timeframe: Timeframe;
}

export const getChartDataByRequests = ({
  isLoggedIn,
  requests,
  shouldShowZeroValues,
  timeframe,
}: GetChartDataByRequestsParams) => {
  if (!requests) {
    if (shouldShowZeroValues) {
      return getEmptyChartData(timeframe).data;
    }

    return [];
  }

  const rows = Object.entries(requests);

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
    .map<IChartData>((row, index) => {
      const { callsCount, time } = row;

      if (isLoggedIn) {
        if (rows.length <= 1) {
          return {
            time,
            value: callsCount,
            extraValue: undefined,
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

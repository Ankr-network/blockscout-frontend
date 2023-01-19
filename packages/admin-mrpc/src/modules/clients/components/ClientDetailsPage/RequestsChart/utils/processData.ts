import { IChartData } from 'modules/common/components/Chart';
import { Timeframe } from '../types';

const { Hour, Day, Week, Month } = Timeframe;

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

export const processData = (
  timeframe: Timeframe,
  requestsLog?: Record<string, number>,
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
    });
};

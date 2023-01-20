import { Timeframe } from '../types';

const { Hour, Day, Week, Month } = Timeframe;

export const formatXAxis = (value: Date, timeframe: Timeframe): string => {
  const date = value.toLocaleDateString();

  const time = value.toLocaleTimeString();

  const timeframesMap: Record<string, string> = {
    [Hour]: time,
    [Day]: time,
    [Week]: date,
    [Month]: date,
  };

  return timeframesMap[timeframe];
};

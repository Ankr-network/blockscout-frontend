import { Timeframe } from '../types';
import { text } from './text';

const { Hour, Day, Week, Month } = Timeframe;

export const formatXAxis = (value: Date, timeframe: Timeframe) => {
  const date = text('date', { value });

  const time = text('time', { value });

  const timeframesMap: Record<Timeframe, string> = {
    [Hour]: time,
    [Day]: time,
    [Week]: date,
    [Month]: date,
  };

  return timeframesMap[timeframe];
};

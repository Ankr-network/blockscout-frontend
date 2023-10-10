import { Timeframe } from '../../../types';

const { Hour, Day, Week, Month } = Timeframe;

interface FormatXAxisProps {
  date: string;
  time: string;
}

export const formatXAxis = (
  { date, time }: FormatXAxisProps,
  timeframe: Timeframe,
) => {
  const timeframesMap: Record<Timeframe, string> = {
    [Hour]: time,
    [Day]: time,
    [Week]: date,
    [Month]: date,
  };

  return timeframesMap[timeframe];
};

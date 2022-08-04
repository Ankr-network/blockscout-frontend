import {
  PaymentHistoryTableTimeframe as Timeframe,
  PaymentHistoryTableTimeframeBorders as Borders,
} from 'domains/account/types';
import {
  DEFAULT_TIMEFRAME,
  MONTH_OFFSET,
  WEEK_OFFSET,
  YEAR_OFFSET,
} from '../const';

const { WEEK, MONTH, YEAR } = Timeframe;

const offsetsMap: Record<Timeframe, number> = {
  [WEEK]: WEEK_OFFSET,
  [MONTH]: MONTH_OFFSET,
  [YEAR]: YEAR_OFFSET,
};

export const getTimeframeBorders = (
  timeframe: Timeframe = DEFAULT_TIMEFRAME,
): Borders => {
  const to = Date.now();
  const from = to - offsetsMap[timeframe];

  return { from, to };
};

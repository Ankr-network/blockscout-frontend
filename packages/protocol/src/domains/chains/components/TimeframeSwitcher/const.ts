import { Timeframe } from 'domains/chains/types';
import { t } from '@ankr.com/common';

const { Hour, Day, Week, Month } = Timeframe;

const timeframes = 'chains.timeframes';

export const valuesMap: Record<Timeframe, string> = {
  [Hour]: t(`${timeframes}.hour`),
  [Day]: t(`${timeframes}.day`),
  [Week]: t(`${timeframes}.week`),
  [Month]: t(`${timeframes}.month`),
};

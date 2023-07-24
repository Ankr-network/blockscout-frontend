import { t } from '@ankr.com/common';
import { Timeframe } from 'multirpc-sdk';

import { Timeframe as ChainsTimeFrame } from 'domains/chains/types';

const { Hour, Day, Week, Month } = ChainsTimeFrame;

const timeframes = 'chains.timeframes';

export const valuesMap: Record<ChainsTimeFrame, Timeframe> = {
  [Hour]: t(`${timeframes}.hour`) as Timeframe,
  [Day]: t(`${timeframes}.day`) as Timeframe,
  [Week]: t(`${timeframes}.week`) as Timeframe,
  [Month]: t(`${timeframes}.month`) as Timeframe,
};

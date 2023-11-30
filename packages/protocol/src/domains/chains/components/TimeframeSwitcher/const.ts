import { t } from '@ankr.com/common';

import { Timeframe } from 'modules/chains/types';

const timeframes = 'chains.timeframes';

export const getValue = (timeframe: Timeframe) => {
  switch (timeframe) {
    case Timeframe.Hour:
      return t(`${timeframes}.hour`);

    case Timeframe.Day:
      return t(`${timeframes}.day`);

    case Timeframe.Week:
      return t(`${timeframes}.week`);

    case Timeframe.Month:
      return t(`${timeframes}.month`);

    default:
      return '';
  }
};

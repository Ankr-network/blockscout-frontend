import { t } from '@ankr.com/common';
import { Timeframe } from '@ankr.com/chains-list';

const timeframes = 'chains.timeframes-string';

export const getTimeframeString = (timeframe: Timeframe) => {
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

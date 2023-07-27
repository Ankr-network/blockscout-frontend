import { useMemo } from 'react';
import { t } from '@ankr.com/common';

import { CountryMap } from 'domains/chains/actions/public/fetchChainTimeframeData';
import { Timeframe } from 'domains/chains/types';

export const useIsRequestsMapVisible = (countries?: CountryMap) => {
  return useMemo(() => !!Object.keys(countries || {}).length, [countries]);
};

export const getLabelByTimeframe = (timeframe: Timeframe) => {
  switch (timeframe) {
    case Timeframe.Hour:
      return t('chains.timeframes.hour');

    case Timeframe.Day:
      return t('chains.timeframes.day');

    case Timeframe.Week:
      return t('chains.timeframes.week');

    case Timeframe.Month:
      return t(`chains.timeframes.month`);

    default:
      return '';
  }
};

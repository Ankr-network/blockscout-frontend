import { Timeframe } from 'domains/chains/types';
import { t } from 'modules/i18n/utils/intl';

const { Hour, Day, Week, Month } = Timeframe;

export const formatXAxis = (value: Date, timeframe: Timeframe): string => {
  const date = t('chain-item.usage-data.chart.date', { value });

  const time = t('chain-item.usage-data.chart.time', { value });

  const timeframesMap: Record<Timeframe, string> = {
    [Hour]: time,
    [Day]: time,
    [Week]: date,
    [Month]: date,
  };

  return timeframesMap[timeframe];
};

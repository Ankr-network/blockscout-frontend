import { t } from '@ankr.com/common';

export const formatDate = (value: Date): string => {
  const date = t('chain-item.usage-data.chart.date', { value });

  const time = t('chain-item.usage-data.chart.time', { value });

  return `${date} ${time}`;
};

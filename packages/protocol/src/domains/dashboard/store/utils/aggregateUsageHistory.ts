import { Locale } from 'modules/i18n/types/locale';

import { AggregatedUsageHistory, Requests } from '../types';

export const aggregateUsageHistory = (requests: Requests) => {
  const now = new Date();

  return Object.entries(requests)
    .filter(([date]) => new Date(Number(date)).getMonth() === now.getMonth())
    .reduce<AggregatedUsageHistory>((result, [date, count]) => {
      const month = new Date(Number(date)).toLocaleString(Locale.en, {
        month: 'long',
      });

      result[month] = (result[month] || 0) + count;

      return result;
    }, {});
};

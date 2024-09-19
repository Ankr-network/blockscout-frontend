import { t } from '@ankr.com/common';
import { PrivateStat } from 'multirpc-sdk';

export const aggregateMethodCallsRequests = (stats?: PrivateStat) => {
  let methodCalls = stats?.total.top_requests || [];

  if (!stats || !methodCalls?.length) {
    return [];
  }

  const totalStatsOtherMethods = stats.total.others_info;

  if (totalStatsOtherMethods?.request_count) {
    methodCalls = [
      ...methodCalls,
      {
        method: t('dashboard.method-calls.other'),
        count: Number(totalStatsOtherMethods.request_count) || 0,
        total_cost: Number(totalStatsOtherMethods.total_cost) || 0,
      },
    ];
  }

  return methodCalls;
};

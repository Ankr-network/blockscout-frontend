import { StatsByRangeRequest, StatsByRangeResponse } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { UsageHistoryDataMapped } from '@ankr.com/telemetry';

import { web3Api } from 'store/queries';
import { accountingGateway } from 'modules/api/MultiService';
import { Locale } from 'modules/i18n/types/locale';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

import { Gateway } from '../types';

type FetchMonthlyUsageHistoryParams = StatsByRangeRequest & Gateway;

const mapStatsResponseToUsageHistoryData = (
  response: StatsByRangeResponse,
): UsageHistoryDataMapped[] =>
  Object.entries(response)
    .reverse()
    .map(([timestamp, calls]) => {
      const date = new Date(Number(timestamp));

      return {
        month: date.toLocaleString(Locale.en, { month: 'long' }),
        calls,
        formattedCallsValue: t('dashboard.usage-history.calls-number', {
          calls,
        }),
      };
    });

export const {
  endpoints: { fetchMonthlyUsageHistory },
  useLazyFetchMonthlyUsageHistoryQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchMonthlyUsageHistory: build.query<
      UsageHistoryDataMapped[],
      FetchMonthlyUsageHistoryParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({
          group,
          token,
          monthly = true,
          gateway = accountingGateway,
        }) => {
          const response = await gateway.getUserStatsByRange({
            group,
            token,
            monthly,
          });

          return { data: mapStatsResponseToUsageHistoryData(response) };
        },
      ),
    }),
  }),
  overrideExisting: true,
});

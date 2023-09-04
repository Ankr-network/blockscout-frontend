import { StatsByRangeRequest, StatsByRangeResponse } from 'multirpc-sdk';

import { web3Api } from 'store/queries';
import { MultiService } from 'modules/api/MultiService';
import { Locale } from 'modules/i18n/types/locale';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { UsageHistoryData } from 'domains/dashboard/store/types';

const mapStatsResponseToUsageHistoryData = (response: StatsByRangeResponse) =>
  Object.entries(response)
    .reverse()
    .map(([timestamp, calls]) => {
      const date = new Date(Number(timestamp));

      return {
        month: date.toLocaleString(Locale.en, { month: 'long' }),
        calls,
      };
    });

export const {
  endpoints: { fetchMonthlyUsageHistory },
  useLazyFetchMonthlyUsageHistoryQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchMonthlyUsageHistory: build.query<
      UsageHistoryData[],
      StatsByRangeRequest
    >({
      queryFn: createNotifyingQueryFn(
        async ({ group, token, monthly = true }) => {
          const api = MultiService.getService().getAccountingGateway();

          const response = await api.getUserStatsByRange({
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

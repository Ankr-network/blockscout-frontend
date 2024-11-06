import { StatsByRangeResponse } from 'multirpc-sdk';
import { UsageHistoryDataMapped } from '@ankr.com/telemetry';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { Locale } from 'modules/i18n';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { usePrivateTotalStatsByRange } from 'modules/stats/hooks/usePrivateTotalStatsByRange';

const mapStatsByRangeToUsageHistory = (statsByRange: StatsByRangeResponse) =>
  Object.entries(statsByRange)
    .reverse()
    .map<UsageHistoryDataMapped>(([timestamp, calls]) => {
      const date = new Date(Number(timestamp));

      return {
        month: date.toLocaleString(Locale.en, { month: 'long' }),
        calls,
        formattedCallsValue: t('dashboard.usage-history.calls-number', {
          calls,
        }),
      };
    });

export const useUsageHistory = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { selectedProjectEndpointToken } = useTokenManagerConfigSelector();

  const { loading, totalStatsByRange } = usePrivateTotalStatsByRange({
    group,
    monthly: true,
    token: selectedProjectEndpointToken,
  });

  const usageHistory = useMemo(
    () => mapStatsByRangeToUsageHistory(totalStatsByRange),
    [totalStatsByRange],
  );

  return { loading, usageHistory };
};

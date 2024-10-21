import { BaseTableData } from '@ankr.com/telemetry';
import { ChainID, Timeframe } from '@ankr.com/chains-list';
import { Top10StatItem } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { REFETCH_STATS_INTERVAL } from 'modules/common/constants/const';
import { mapCountries } from 'domains/dashboard/store/utils/mapCountries';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { useFetchTop10StatsQuery } from 'domains/dashboard/actions/fetchTop10Stats';
import { useMultiServiceGateway } from 'domains/dashboard/hooks/useMultiServiceGateway';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

const mapIpRequests = (ip: Top10StatItem): BaseTableData => ({
  label: ip.key,
  value: t('dashboard.requests-by-ip.count', { count: ip.value }),
});

export const useTop10Stats = (timeframe: Timeframe, blockchain?: ChainID) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { gateway, isEnterpriseStatusLoading } = useMultiServiceGateway();

  const { data: top10Data, isLoading } = useFetchTop10StatsQuery(
    {
      blockchain,
      gateway,
      group,
      intervalType: timeframeToIntervalMap[timeframe],
    },
    {
      skip: isEnterpriseStatusLoading,
      refetchOnMountOrArgChange: REFETCH_STATS_INTERVAL,
    },
  );

  const countries = useMemo(() => {
    return top10Data?.countries?.map(mapCountries) || [];
  }, [top10Data?.countries]);

  const ipRequests = useMemo(() => {
    return top10Data?.ips?.map(mapIpRequests) || [];
  }, [top10Data?.ips]);

  return { top10Data, countries, ipRequests, isLoading };
};

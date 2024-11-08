import { BaseTableData } from '@ankr.com/telemetry';
import { ChainID, Timeframe } from '@ankr.com/chains-list';
import { Top10StatItem } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { mapCountries } from 'domains/dashboard/store/utils/mapCountries';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { usePrivateTop10Stats } from 'modules/stats/hooks/usePrivateTop10Stats';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { useEnterprisePrivateTop10Stats } from 'modules/stats/hooks/useEnterprisePrivateTop10Stats';

const mapIpRequests = (ip: Top10StatItem): BaseTableData => ({
  label: ip.key,
  value: t('dashboard.requests-by-ip.count', { count: ip.value }),
});

export const useTop10Stats = (timeframe: Timeframe, blockchain?: ChainID) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  const interval = timeframeToIntervalMap[timeframe];

  const { loading: top10StatsLoading, top10Stats } = usePrivateTop10Stats({
    blockchain,
    group,
    interval,
    skipFetching: isEnterpriseStatusLoading || isEnterpriseClient,
  });

  const {
    loading: enterpriseTop10StatsLoading,
    top10Stats: enterpriseTop10Stats,
  } = useEnterprisePrivateTop10Stats({
    blockchain,
    group,
    interval,
    skipFetching: isEnterpriseStatusLoading || !isEnterpriseClient,
  });

  const [stats, loading] = isEnterpriseClient
    ? ([enterpriseTop10Stats, enterpriseTop10StatsLoading] as const)
    : ([top10Stats, top10StatsLoading] as const);

  const countries = useMemo(
    () => stats.countries?.map(mapCountries) ?? [],
    [stats],
  );

  const ipRequests = useMemo(
    () => stats.ips?.map(mapIpRequests) ?? [],
    [stats],
  );

  return { countries, ipRequests, loading, stats };
};

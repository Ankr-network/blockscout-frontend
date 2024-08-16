import { useEffect, useMemo } from 'react';
import { Top10StatItem } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { BaseTableData } from '@ankr.com/telemetry';

import { ChainID, Timeframe } from 'modules/chains/types';
import { useLazyFetchTop10StatsQuery } from 'domains/dashboard/actions/fetchTop10Stats';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useMultiServiceGateway } from 'domains/dashboard/hooks/useMultiServiceGateway';
import { mapCountries } from 'domains/dashboard/store/utils/mapCountries';

const mapIpRequests = (ip: Top10StatItem): BaseTableData => ({
  label: ip.key,
  value: t('dashboard.requests-by-ip.count', { count: ip.value }),
});

export const useTop10Stats = (timeframe: Timeframe, blockchain?: ChainID) => {
  const [fetchTop10Stats, { data: top10Data }] = useLazyFetchTop10StatsQuery();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { gateway, isEnterpriseStatusLoading } = useMultiServiceGateway();

  useEffect(() => {
    if (!isEnterpriseStatusLoading) {
      fetchTop10Stats({
        intervalType: timeframeToIntervalMap[timeframe],
        group,
        blockchain,
        gateway,
      });
    }
  }, [
    fetchTop10Stats,
    timeframe,
    group,
    blockchain,
    gateway,
    isEnterpriseStatusLoading,
  ]);

  const countries = useMemo(() => {
    return top10Data?.countries?.map(mapCountries) || [];
  }, [top10Data?.countries]);

  const ipRequests = useMemo(() => {
    return top10Data?.ips?.map(mapIpRequests) || [];
  }, [top10Data?.ips]);

  return {
    top10Data,
    countries,
    ipRequests,
  };
};

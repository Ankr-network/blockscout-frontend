import { useEffect, useMemo } from 'react';
import { Top10StatItem } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { BaseTableData } from '@ankr.com/telemetry';

import { ChainID, Timeframe } from 'domains/chains/types';
import { useLazyFetchTop10StatsQuery } from 'domains/dashboard/actions/fetchTop10Stats';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

const mapIpRequests = (ip: Top10StatItem): BaseTableData => ({
  label: ip.key,
  value: t('dashboard.requests-by-ip.count', { count: ip.value }),
});

const mapCountries = (country: Top10StatItem): BaseTableData => {
  let regionName = '';

  try {
    regionName = regionNames.of(country.key) ?? '';
  } catch {
    regionName = country.key;
  }

  return {
    label: regionName,
    value: t('dashboard.top-countries.count', { count: country.value }),
  };
};

export const useTop10Stats = (timeframe: Timeframe, blockchain?: ChainID) => {
  const [fetchTop10Stats, { data: top10Data }] = useLazyFetchTop10StatsQuery();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  useEffect(() => {
    fetchTop10Stats({
      intervalType: timeframeToIntervalMap[timeframe],
      group,
      blockchain,
    });
  }, [fetchTop10Stats, timeframe, group, blockchain]);

  const countries = useMemo(() => {
    return top10Data?.countries?.map(mapCountries) || [];
  }, [top10Data?.countries]);

  const ipRequests = useMemo(() => {
    return top10Data?.ips?.map(mapIpRequests) || [];
  }, [top10Data?.ips]);

  return {
    countries,
    ipRequests,
  };
};

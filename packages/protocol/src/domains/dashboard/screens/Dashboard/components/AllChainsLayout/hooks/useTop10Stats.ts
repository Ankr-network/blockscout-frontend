import { useEffect, useMemo } from 'react';
import { IpDetails, Top10StatItem } from 'multirpc-sdk';
import { ChainID, Timeframe } from 'domains/chains/types';
import { useLazyFetchTop10StatsQuery } from 'domains/dashboard/actions/fetchTop10Stats';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { TopCountriesData } from '../../TopCountriesWidget';

const mapIpRequests = (ip: Top10StatItem): IpDetails => ({
  ip: ip.key,
  count: ip.value,
  total_cost: 0,
});

const mapCountries = (country: Top10StatItem): TopCountriesData => ({
  country: country.key,
  count: country.value,
});

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

import { createSelector } from '@reduxjs/toolkit';
import { ETelemetryTopOf, IUsageStatsParams } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { IChartData } from '@ankr.com/telemetry';
import { secondsToMilliseconds } from 'date-fns';

import { RootState } from 'store';
import { ChainID } from 'modules/chains/types';
import { chainsFetchEnterpriseV2StatsTotal } from 'domains/enterprise/actions/v2/fetchEnterpriseStatsTotal';
import { selectEnterpriseEndpoints } from 'domains/enterprise/store/selectors';
import { selectBlockchainsData } from 'modules/chains/store/selectors';

import { mapTopToBaseDataTableProps } from '../utils/mapTopToBaseDataTableProps';
import { maskApiKey } from '../utils/maskApiKey';
import { mapRegionName } from '../utils/mapCountries';
import { mapChainCallsData } from '../utils/mapChainCallsData';
import { squeezeChainCalls } from '../utils/squeezeChainCallsV2';
// TODO: move to v2 when v1 is deprecated
import { selectChainNamesMap } from './v1';

export const selectUsageData = createSelector(
  chainsFetchEnterpriseV2StatsTotal.select(
    undefined as unknown as IUsageStatsParams,
  ),
  ({ data }) => data,
);

export const selectIsUsageLoading = createSelector(
  chainsFetchEnterpriseV2StatsTotal.select(
    undefined as unknown as IUsageStatsParams,
  ),
  ({ isLoading, isUninitialized }) => ({
    isLoading,
    isUninitialized,
  }),
);

export const selectUsageDataError = createSelector(
  chainsFetchEnterpriseV2StatsTotal.select(
    undefined as unknown as IUsageStatsParams,
  ),
  ({ error }) => error,
);

export const selectAllTimeRequestsNumber = createSelector(
  selectUsageData,
  data => data?.all_time_total || 0,
);

export const selectTotalRequestsNumber = createSelector(
  selectUsageData,
  data => data?.total || 0,
);

export const selectIpRequestsNumber = createSelector(selectUsageData, data => {
  const topIpData = data?.tops?.find(
    topItem => topItem.top_of === ETelemetryTopOf.IP,
  );

  return mapTopToBaseDataTableProps(topIpData);
});

export const selectResponseCodesNumber = createSelector(
  selectUsageData,
  data => {
    const topResponseCodesData = data?.tops?.find(
      topItem => topItem.top_of === ETelemetryTopOf.ERROR,
    );

    return mapTopToBaseDataTableProps(topResponseCodesData);
  },
);

export const selectTopCountries = createSelector(selectUsageData, data => {
  const topCountryData = data?.tops?.find(
    topItem => topItem.top_of === ETelemetryTopOf.COUNTRY,
  );

  const mappedCountries = {
    ...topCountryData,
    elements:
      topCountryData?.elements?.map(({ name, count }) => ({
        name: mapRegionName(name),
        count,
      })) || null,
    top_of: topCountryData?.top_of || ETelemetryTopOf.COUNTRY,
  };

  return mapTopToBaseDataTableProps(mappedCountries);
});

export const selectTopMonthlyStats = createSelector(selectUsageData, data => {
  const topMonthlyData = data?.tops?.find(
    topItem => topItem.top_of === ETelemetryTopOf.MONTHLY_USAGE,
  );

  const monthlyData =
    topMonthlyData?.elements?.map(topElement => ({
      month: topElement.name,
      calls: topElement.count,
      formattedCallsValue: t('dashboard.usage-history.calls-number', {
        calls: topElement.count,
      }),
    })) || [];

  // data from backend is sorted in descending order, so we need to reverse it
  return [...monthlyData].reverse();
});

export const selectChainCallsData = createSelector(
  selectUsageData,
  selectTotalRequestsNumber,
  selectChainNamesMap,
  selectBlockchainsData,
  // eslint-disable-next-line max-params
  (data, totalRequestsNumber, chainNamesMap, blockchains) => {
    const chainCallsData = data?.tops?.find(
      topItem => topItem.top_of === ETelemetryTopOf.BLOCKCHAIN,
    );

    const mappedChains = mapChainCallsData({
      chainCallsData,
      totalRequestsNumber,
      chainNamesMap,
      blockchains,
    });

    return mappedChains;
  },
);

export const selectSqueezedChainCallsData = createSelector(
  selectChainCallsData,
  chainCallsData => squeezeChainCalls(chainCallsData),
);

export const selectProjectsCallData = createSelector(
  selectUsageData,
  selectTotalRequestsNumber,
  selectEnterpriseEndpoints,
  (usageData, totalRequestsNumber, { data: projectsData }) => {
    const projectsCallData = usageData?.tops?.find(
      topItem => topItem.top_of === ETelemetryTopOf.API_KEY,
    );

    return (
      projectsCallData?.elements?.map(({ name, count }) => {
        const projectName =
          projectsData?.find(({ enterprise_api_key }) => {
            const maskedApiKey = maskApiKey(enterprise_api_key);

            return maskedApiKey === name;
          })?.enterprise_api_key_name || name;

        return {
          name: projectName,
          value: count / totalRequestsNumber,
        };
      }) || []
    );
  },
);

export const selectRequestsChartData = createSelector(
  selectUsageData,
  (data): IChartData[] => {
    const currentUsage = data?.request_timelines?.find(
      timeline => timeline.name === 'Usage',
    );

    if (!currentUsage) {
      return [];
    }

    return currentUsage.points.map(({ time, value }) => {
      return {
        time: new Date(secondsToMilliseconds(time)),
        value,
      };
    });
  },
);

export const selectRequestsChartDataGroupedByChainId = createSelector(
  selectUsageData,
  (_state: RootState, chainId: ChainID) => chainId,
  (data, chainId): IChartData[] => {
    const currentUsage = data?.request_timelines?.find(
      timeline => timeline.name === chainId,
    );

    if (!currentUsage) {
      return [];
    }

    return currentUsage?.points?.map(({ time, value }) => {
      return {
        time: new Date(secondsToMilliseconds(time)),
        value,
      };
    });
  },
);

export const selectMethodCallsData = createSelector(
  selectUsageData,
  selectTotalRequestsNumber,
  (data, totalRequestsNumber) => {
    const methodCallsData = data?.tops?.find(
      topItem => topItem.top_of === ETelemetryTopOf.METHOD,
    );

    return (
      methodCallsData?.elements?.map(element => {
        return {
          ...element,
          method: element.name,
          value: element.count / totalRequestsNumber,
        };
      }) || []
    );
  },
);

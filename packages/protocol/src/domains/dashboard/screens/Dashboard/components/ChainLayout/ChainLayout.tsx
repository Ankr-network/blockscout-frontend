import {
  RequestsWidget,
  MethodCallsWidget,
  BaseTable,
} from '@ankr.com/telemetry';
import { t, tHTML } from '@ankr.com/common';

import { useProjectSelect } from 'modules/common/components/ProjectSelect/hooks/useProjectSelect';

import { ChainLayoutProps } from './types';
import { EmptyLayoutGuard } from '../EmptyLayoutGuard';
import { LocationsWidget } from '../LocationsWidget';
import { useChainData } from './hooks/useChainData';
import { useChainLayoutStyles } from './ChainLayoutStyles';
import { timeframesMap } from '../../const';

export const ChainLayout = ({
  detailsChainId,
  statsChainId,
  timeframe,
}: ChainLayoutProps) => {
  const {
    allTimeTotalRequestsNumber,
    areLocationsLoading,
    chainStats,
    countries,
    ipRequests,
    locations,
    requestsChartData,
    totalRequestsNumber,
    methodCalls,
    blockHeight,
    isLoadingTotalStats,
  } = useChainData({ statsChainId, detailsChainId, timeframe });

  const { hasSelectedProject } = useProjectSelect();

  const { classes } = useChainLayoutStyles(hasSelectedProject);

  return (
    <EmptyLayoutGuard data={requestsChartData}>
      <div className={classes.root}>
        <RequestsWidget
          timeframe={timeframe}
          data={requestsChartData}
          className={classes.requests}
          isLoading={isLoadingTotalStats}
          title={t('dashboard.requests-chart.title')}
          requestsTitle={tHTML('dashboard.requests-chart.requests', {
            timeframe: t(
              `dashboard.requests-chart.timeframes.${timeframesMap[timeframe]}`,
            ),
            requests: totalRequestsNumber,
          })}
          allRequestsTitle={tHTML('dashboard.requests-chart.all-requests', {
            requests: allTimeTotalRequestsNumber,
          })}
        />
        <MethodCallsWidget
          className={classes.methods}
          total={chainStats?.total.count}
          requests={methodCalls}
          timeframe={timeframe}
          blockHeight={blockHeight}
        />
        {!hasSelectedProject && (
          <BaseTable
            headingTitles={[
              t('dashboard.requests-by-ip.ip'),
              t('dashboard.requests-by-ip.requests'),
            ]}
            className={classes.ipRequests}
            data={ipRequests}
            title={t('dashboard.requests-by-ip.title')}
          />
        )}
        <LocationsWidget
          className={classes.locations}
          isLoading={areLocationsLoading}
          locations={locations}
        />
        {!hasSelectedProject && (
          <BaseTable
            headingTitles={[
              t('dashboard.top-countries.country'),
              t('dashboard.top-countries.requests'),
            ]}
            title={t('dashboard.top-countries.title')}
            className={classes.countries}
            data={countries}
          />
        )}
      </div>
    </EmptyLayoutGuard>
  );
};

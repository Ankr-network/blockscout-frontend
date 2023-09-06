import {
  RequestsWidget,
  BaseTable,
  UsageHistoryWidget,
} from '@ankr.com/telemetry';
import { t, tHTML } from '@ankr.com/common';

import { useProjectSelect } from 'modules/common/components/ProjectSelect/hooks/useProjectSelect';

import { EmptyLayoutGuard } from '../EmptyLayoutGuard';
import { ILayoutProps } from '../../types';
import { LocationsWidget } from '../LocationsWidget';
import { ProjectsWidget } from '../ProjectsWidget';
import { useAllChainsData } from './hooks/useAllChainsData';
import { useAllChainsLayoutStyles } from './AllChainsLayoutStyles';
import { useMonthlyStats } from '../../hooks/useMonthlyStats';
import { timeframesMap } from '../../const';
import { ChainCallsWidget } from '../ChainCallsWidget';

export const AllChainsLayout = ({ timeframe }: ILayoutProps) => {
  const { hasSelectedProject } = useProjectSelect();

  const { classes } = useAllChainsLayoutStyles(hasSelectedProject);

  const {
    allTimeTotalRequestsNumber,
    areLocationsLoading,
    countries,
    ipRequests,
    locations,
    requestsChartData,
    totalRequestsNumber,
    isLoadingTotalStats,
  } = useAllChainsData(timeframe);

  const { data: monthlyStats = [] } = useMonthlyStats();

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
        <ChainCallsWidget className={classes.calls} />
        <ProjectsWidget className={classes.projects} timeframe={timeframe} />
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
        <UsageHistoryWidget
          headingTitles={[
            t('dashboard.usage-history.month'),
            t('dashboard.usage-history.calls'),
          ]}
          title={t('dashboard.usage-history.title')}
          className={classes.history}
          data={monthlyStats}
        />
      </div>
    </EmptyLayoutGuard>
  );
};

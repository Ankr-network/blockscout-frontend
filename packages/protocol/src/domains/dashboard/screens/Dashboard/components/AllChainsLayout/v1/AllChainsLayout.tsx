import {
  RequestsWidget,
  BaseTable,
  UsageHistoryWidget,
} from '@ankr.com/telemetry';
import { t } from '@ankr.com/common';

import { useProjectSelect } from 'modules/common/components/ProjectSelect/hooks/useProjectSelect';

import { useMonthlyStats } from '../../../v1/hooks/useMonthlyStats';
import { EmptyLayoutGuard } from '../../EmptyLayoutGuard';
import { ILayoutProps } from '../../../types';
import { LocationsWidget } from '../../LocationsWidget';
import { ProjectsWidget } from '../../ProjectsWidget';
import { useAllChainsData } from './hooks/useAllChainsData';
import { useAllChainsLayoutStyles } from '../AllChainsLayoutStyles';
import { ChainCallsWidget } from '../../ChainCallsWidget';
import { getRequestsChartTranslations } from '../../../useChartsTranslations';
import { useChainCalls } from '../../ChainCallsWidget/hooks/useChainCalls';
import { useProjectsData } from './hooks/useProjectsData';

export const AllChainsLayout = ({ timeframe }: ILayoutProps) => {
  const { hasSelectedProject } = useProjectSelect();

  const { classes } = useAllChainsLayoutStyles(hasSelectedProject);

  const {
    allTimeTotalRequestsNumber,
    areLocationsLoading,
    countries,
    ipRequests,
    isLoadingTotalStats,
    locations,
    requestsChartData,
    totalRequestsNumber,
  } = useAllChainsData(timeframe);

  const { data: monthlyStats = [] } = useMonthlyStats();

  const { data: chainCallsData, isLoading: isLoadingChainCalls } =
    useChainCalls({ timeframe });

  const {
    amount: projectsDataTotal,
    data: projectCallsData,
    isLoading: isLoadingProjectCalls,
  } = useProjectsData(timeframe);

  return (
    <EmptyLayoutGuard data={requestsChartData}>
      <div className={classes.root}>
        <RequestsWidget
          timeframe={timeframe}
          data={requestsChartData}
          className={classes.requests}
          isLoading={isLoadingTotalStats}
          translation={getRequestsChartTranslations({
            timeframe,
            allTimeTotalRequestsNumber,
            totalRequestsNumber,
          })}
        />
        <ChainCallsWidget
          className={classes.calls}
          data={chainCallsData}
          isLoading={isLoadingChainCalls}
          totalRequests={totalRequestsNumber}
        />
        <ProjectsWidget
          className={classes.projects}
          amount={Number(projectsDataTotal)}
          data={projectCallsData}
          isLoading={isLoadingProjectCalls}
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

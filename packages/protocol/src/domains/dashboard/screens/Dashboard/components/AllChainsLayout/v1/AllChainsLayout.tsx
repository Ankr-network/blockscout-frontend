import {
  RequestsWidget,
  BaseTable,
  UsageHistoryWidget,
} from '@ankr.com/telemetry';
import { t } from '@ankr.com/common';

import { useProjectSelect } from 'modules/common/components/ProjectSelect/hooks/useProjectSelect';

import { ChainCallsWidget } from '../../ChainCallsWidget';
import { EmptyLayoutGuard } from '../../EmptyLayoutGuard';
import { ILayoutProps } from '../../../types';
import { ProjectsWidget } from '../../ProjectsWidget';
import { RequestsWidgetPlaceholder } from '../../RequestsWidgetPlaceholder';
import { WidgetPlaceholder } from '../../WidgetPlaceholder';
import { getRequestsChartTranslations } from '../../../useChartsTranslations';
import { useAllChainsData } from './hooks/useAllChainsData';
import { useAllChainsLayoutStyles } from './AllChainsLayoutStyles';
import { useChainCalls } from '../../ChainCallsWidget/hooks/useChainCalls';
import { useProjectsData } from './hooks/useProjectsData';
import { useUsageHistory } from '../../../v1/hooks/useUsageHistory';

export const AllChainsLayout = ({ timeframe }: ILayoutProps) => {
  const { hasSelectedProject } = useProjectSelect();

  const { classes } = useAllChainsLayoutStyles(hasSelectedProject);

  const {
    allTimeTotalRequestsNumber,
    countries,
    ipRequests,
    privateStatsLoading,
    requestsChartData,
    top10StatsLoading,
    totalRequestsNumber,
    totalStatsLoading,
  } = useAllChainsData(timeframe);

  const { loading: usageHistoryLoading, usageHistory } = useUsageHistory();

  const { data: chainCallsData, loading: chainCallsLoading } = useChainCalls({
    timeframe,
  });

  const {
    loading: projectCallsLoading,
    pieChartData: projectCallsData,
    totalRequests: projectsDataTotal,
  } = useProjectsData({ timeframe });

  const hasNoRequests = allTimeTotalRequestsNumber === 0;

  return (
    <EmptyLayoutGuard hasPlaceholder={hasNoRequests && !totalStatsLoading}>
      <div className={classes.root}>
        <RequestsWidget
          NoDataPlaceholder={RequestsWidgetPlaceholder}
          allTimeTotalRequestsLoading={totalStatsLoading}
          className={classes.requests}
          data={requestsChartData}
          isLoading={privateStatsLoading}
          timeframe={timeframe}
          translation={getRequestsChartTranslations({
            timeframe,
            allTimeTotalRequestsNumber,
            totalRequestsNumber,
          })}
        />
        <ChainCallsWidget
          className={classes.calls}
          data={chainCallsData}
          isLoading={chainCallsLoading}
          totalRequests={totalRequestsNumber}
        />
        <ProjectsWidget
          amount={Number(projectsDataTotal)}
          className={classes.projects}
          data={projectCallsData}
          isLoading={projectCallsLoading}
        />
        {!hasSelectedProject && (
          <BaseTable
            NoDataPlaceholder={WidgetPlaceholder}
            className={classes.ipRequests}
            data={ipRequests}
            headingTitles={[
              t('dashboard.requests-by-ip.ip'),
              t('dashboard.requests-by-ip.requests'),
            ]}
            isLoading={top10StatsLoading}
            title={t('dashboard.requests-by-ip.title')}
          />
        )}
        {!hasSelectedProject && (
          <BaseTable
            NoDataPlaceholder={WidgetPlaceholder}
            className={classes.countries}
            data={countries}
            headingTitles={[
              t('dashboard.top-countries.country'),
              t('dashboard.top-countries.requests'),
            ]}
            isLoading={top10StatsLoading}
            title={t('dashboard.top-countries.title')}
          />
        )}
        <UsageHistoryWidget
          NoDataPlaceholder={WidgetPlaceholder}
          className={classes.history}
          data={usageHistory}
          headingTitles={[
            t('dashboard.usage-history.month'),
            t('dashboard.usage-history.calls'),
          ]}
          isLoading={usageHistoryLoading}
          title={t('dashboard.usage-history.title')}
        />
      </div>
    </EmptyLayoutGuard>
  );
};

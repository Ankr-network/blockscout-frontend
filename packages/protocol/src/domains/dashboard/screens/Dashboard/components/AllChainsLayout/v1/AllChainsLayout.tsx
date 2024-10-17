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
import { useMonthlyStats } from '../../../v1/hooks/useMonthlyStats';
import { useProjectsData } from './hooks/useProjectsData';

export const AllChainsLayout = ({ timeframe }: ILayoutProps) => {
  const { hasSelectedProject } = useProjectSelect();

  const { classes } = useAllChainsLayoutStyles(hasSelectedProject);

  const {
    allTimeTotalRequestsNumber,
    countries,
    ipRequests,
    isLoadingTotalStats,
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

  const hasNoRequests = allTimeTotalRequestsNumber === 0;

  return (
    <EmptyLayoutGuard hasPlaceholder={hasNoRequests && !isLoadingTotalStats}>
      <div className={classes.root}>
        <RequestsWidget
          NoDataPlaceholder={RequestsWidgetPlaceholder}
          className={classes.requests}
          data={requestsChartData}
          isLoading={isLoadingTotalStats}
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
            NoDataPlaceholder={WidgetPlaceholder}
            headingTitles={[
              t('dashboard.requests-by-ip.ip'),
              t('dashboard.requests-by-ip.requests'),
            ]}
            className={classes.ipRequests}
            data={ipRequests}
            title={t('dashboard.requests-by-ip.title')}
          />
        )}
        {!hasSelectedProject && (
          <BaseTable
            NoDataPlaceholder={WidgetPlaceholder}
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
          NoDataPlaceholder={WidgetPlaceholder}
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

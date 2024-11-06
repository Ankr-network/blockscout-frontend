import {
  BaseTable,
  RequestsWidget,
  UsageHistoryWidget,
} from '@ankr.com/telemetry';
import { t } from '@ankr.com/common';

import { ChainCallsWidget } from '../../ChainCallsWidget';
import { EmptyLayoutGuard } from '../../EmptyLayoutGuard';
import { ILayoutProps } from '../../../types';
import { ProjectsWidget } from '../../ProjectsWidget';
import { RequestsWidgetPlaceholder } from '../../RequestsWidgetPlaceholder';
import { WidgetPlaceholder } from '../../WidgetPlaceholder';
import { getRequestsChartTranslations } from '../../../useChartsTranslations';
import { useAllChainsData } from './hooks/useAllChainsData';
import { useAllChainsLayoutStylesV2 } from './AllChainsLayoutStylesV2';

export const AllChainsLayout = ({ timeframe }: ILayoutProps) => {
  const { classes: classesV2 } = useAllChainsLayoutStylesV2(false);

  const {
    allTimeTotalRequestsNumber,
    chainCallsData,
    countries,
    ipRequests,
    monthlyStats,
    projectCallsData,
    requestsChartData,
    responseError,
    responses,
    totalRequestsNumber,
    totalStatsLoading,
  } = useAllChainsData();

  const hasError = Boolean(responseError);
  const hasNoRequests = allTimeTotalRequestsNumber === 0 && !totalStatsLoading;

  return (
    <EmptyLayoutGuard hasPlaceholder={hasError || hasNoRequests}>
      <div className={classesV2.root}>
        <RequestsWidget
          NoDataPlaceholder={RequestsWidgetPlaceholder}
          allTimeTotalRequestsLoading={totalStatsLoading}
          className={classesV2.requests}
          data={requestsChartData}
          isLoading={totalStatsLoading}
          timeframe={timeframe}
          translation={getRequestsChartTranslations({
            timeframe,
            allTimeTotalRequestsNumber,
            totalRequestsNumber,
          })}
        />
        <ChainCallsWidget
          className={classesV2.calls}
          data={chainCallsData}
          isLoading={totalStatsLoading}
          totalRequests={totalRequestsNumber}
        />
        <ProjectsWidget
          className={classesV2.projects}
          data={projectCallsData}
          isLoading={totalStatsLoading}
          amount={totalRequestsNumber}
        />
        <BaseTable
          NoDataPlaceholder={WidgetPlaceholder}
          className={classesV2.ipRequests}
          data={ipRequests}
          headingTitles={[
            t('dashboard.requests-by-ip.ip'),
            t('dashboard.requests-by-ip.requests'),
          ]}
          isLoading={totalStatsLoading}
          title={t('dashboard.requests-by-ip.title')}
        />
        <BaseTable
          NoDataPlaceholder={WidgetPlaceholder}
          className={classesV2.responses}
          data={responses}
          headingTitles={[
            t('dashboard.top-responses.code'),
            t('dashboard.top-responses.amount'),
          ]}
          isLoading={totalStatsLoading}
          title={t('dashboard.top-responses.title')}
        />
        <BaseTable
          NoDataPlaceholder={WidgetPlaceholder}
          className={classesV2.countries}
          data={countries}
          headingTitles={[
            t('dashboard.top-countries.country'),
            t('dashboard.top-countries.requests'),
          ]}
          isLoading={totalStatsLoading}
          title={t('dashboard.top-countries.title')}
        />
        <UsageHistoryWidget
          NoDataPlaceholder={WidgetPlaceholder}
          className={classesV2.history}
          data={monthlyStats}
          headingTitles={[
            t('dashboard.usage-history.month'),
            t('dashboard.usage-history.calls'),
          ]}
          isLoading={totalStatsLoading}
          title={t('dashboard.usage-history.title')}
        />
      </div>
    </EmptyLayoutGuard>
  );
};

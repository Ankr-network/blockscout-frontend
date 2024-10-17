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
    isLoadingTotalStats,
    monthlyStats,
    projectCallsData,
    requestsChartData,
    responseError,
    responses,
    totalRequestsNumber,
  } = useAllChainsData();

  const hasError = Boolean(responseError);
  const hasNoRequests =
    allTimeTotalRequestsNumber === 0 && !isLoadingTotalStats;

  return (
    <EmptyLayoutGuard hasPlaceholder={hasError || hasNoRequests}>
      <div className={classesV2.root}>
        <RequestsWidget
          NoDataPlaceholder={RequestsWidgetPlaceholder}
          className={classesV2.requests}
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
          className={classesV2.calls}
          data={chainCallsData}
          isLoading={isLoadingTotalStats}
          totalRequests={totalRequestsNumber}
        />
        <ProjectsWidget
          className={classesV2.projects}
          data={projectCallsData}
          isLoading={isLoadingTotalStats}
          amount={totalRequestsNumber}
        />
        <BaseTable
          NoDataPlaceholder={WidgetPlaceholder}
          headingTitles={[
            t('dashboard.requests-by-ip.ip'),
            t('dashboard.requests-by-ip.requests'),
          ]}
          className={classesV2.ipRequests}
          data={ipRequests}
          title={t('dashboard.requests-by-ip.title')}
        />
        <BaseTable
          NoDataPlaceholder={WidgetPlaceholder}
          headingTitles={[
            t('dashboard.top-responses.code'),
            t('dashboard.top-responses.amount'),
          ]}
          title={t('dashboard.top-responses.title')}
          className={classesV2.responses}
          data={responses}
        />
        <BaseTable
          NoDataPlaceholder={WidgetPlaceholder}
          headingTitles={[
            t('dashboard.top-countries.country'),
            t('dashboard.top-countries.requests'),
          ]}
          title={t('dashboard.top-countries.title')}
          className={classesV2.countries}
          data={countries}
        />
        <UsageHistoryWidget
          NoDataPlaceholder={WidgetPlaceholder}
          headingTitles={[
            t('dashboard.usage-history.month'),
            t('dashboard.usage-history.calls'),
          ]}
          title={t('dashboard.usage-history.title')}
          className={classesV2.history}
          data={monthlyStats}
        />
      </div>
    </EmptyLayoutGuard>
  );
};

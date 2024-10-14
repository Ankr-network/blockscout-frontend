import {
  BaseTable,
  RequestsWidget,
  UsageHistoryWidget,
} from '@ankr.com/telemetry';
import { t } from '@ankr.com/common';

import { ILayoutProps } from '../../../types';
import { EmptyLayoutGuard } from '../../EmptyLayoutGuard';
import { getRequestsChartTranslations } from '../../../useChartsTranslations';
import { ChainCallsWidget } from '../../ChainCallsWidget';
import { ProjectsWidget } from '../../ProjectsWidget';
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

  return (
    <EmptyLayoutGuard data={responseError ? [] : requestsChartData}>
      <div className={classesV2.root}>
        <RequestsWidget
          timeframe={timeframe}
          data={requestsChartData}
          className={classesV2.requests}
          isLoading={isLoadingTotalStats}
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
          headingTitles={[
            t('dashboard.requests-by-ip.ip'),
            t('dashboard.requests-by-ip.requests'),
          ]}
          className={classesV2.ipRequests}
          data={ipRequests}
          title={t('dashboard.requests-by-ip.title')}
        />
        <BaseTable
          headingTitles={[
            t('dashboard.top-responses.code'),
            t('dashboard.top-responses.amount'),
          ]}
          title={t('dashboard.top-responses.title')}
          className={classesV2.responses}
          data={responses}
        />
        <BaseTable
          headingTitles={[
            t('dashboard.top-countries.country'),
            t('dashboard.top-countries.requests'),
          ]}
          title={t('dashboard.top-countries.title')}
          className={classesV2.countries}
          data={countries}
        />
        <UsageHistoryWidget
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

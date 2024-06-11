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
import { useAllChainsDataV2 } from './hooks/useAllChainsDataV2';
import { useAllChainsLayoutStyles } from '../AllChainsLayoutStyles';

export const AllChainsLayout = ({ timeframe }: ILayoutProps) => {
  const { classes } = useAllChainsLayoutStyles(false);

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
  } = useAllChainsDataV2();

  return (
    <EmptyLayoutGuard data={responseError ? [] : requestsChartData}>
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
          isLoading={isLoadingTotalStats}
          totalRequests={totalRequestsNumber}
        />
        <ProjectsWidget
          className={classes.projects}
          data={projectCallsData}
          isLoading={isLoadingTotalStats}
          amount={totalRequestsNumber}
        />
        <BaseTable
          headingTitles={[
            t('dashboard.requests-by-ip.ip'),
            t('dashboard.requests-by-ip.requests'),
          ]}
          className={classes.ipRequests}
          data={ipRequests}
          title={t('dashboard.requests-by-ip.title')}
        />
        <BaseTable
          headingTitles={[
            t('dashboard.top-responses.code'),
            t('dashboard.top-responses.amount'),
          ]}
          title={t('dashboard.top-responses.title')}
          className={classes.locations}
          data={responses}
        />
        <BaseTable
          headingTitles={[
            t('dashboard.top-countries.country'),
            t('dashboard.top-countries.requests'),
          ]}
          title={t('dashboard.top-countries.title')}
          className={classes.countries}
          data={countries}
        />
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

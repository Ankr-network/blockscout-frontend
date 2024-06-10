import {
  RequestsWidget,
  MethodCallsWidget,
  BaseTable,
} from '@ankr.com/telemetry';
import { t } from '@ankr.com/common';

import { ChainLayoutProps } from '../types';
import { EmptyLayoutGuard } from '../../EmptyLayoutGuard';
import { useChainData } from './hooks/useChainData';
import { useChainLayoutStyles } from '../ChainLayoutStyles';
import { useChartTranslations } from '../../../useChartsTranslations';

export const ChainLayout = ({
  detailsChainId,
  statsChainId,
  timeframe,
  selectedProjectId,
}: ChainLayoutProps) => {
  const {
    allTimeTotalRequestsNumber,
    countries,
    ipRequests,
    requestsChartData,
    totalRequestsNumber,
    methodCalls,
    responses,
    isLoadingTotalStats,
    blockHeight,
    responseError,
  } = useChainData({
    statsChainId,
    detailsChainId,
    timeframe,
    selectedProjectId,
  });

  const { requestsChartTranslations, methodCallsChartTranslations } =
    useChartTranslations({
      timeframe,
      totalRequestsNumber,
      allTimeTotalRequestsNumber,
    });

  const { classes } = useChainLayoutStyles(false);

  return (
    <EmptyLayoutGuard data={responseError ? [] : requestsChartData}>
      <div className={classes.root}>
        <RequestsWidget
          timeframe={timeframe}
          data={requestsChartData}
          className={classes.requests}
          isLoading={isLoadingTotalStats}
          translation={requestsChartTranslations}
        />
        <MethodCallsWidget
          className={classes.methods}
          total={totalRequestsNumber}
          requests={methodCalls}
          timeframe={timeframe}
          isLoading={false}
          blockHeight={blockHeight}
          translation={methodCallsChartTranslations}
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
      </div>
    </EmptyLayoutGuard>
  );
};

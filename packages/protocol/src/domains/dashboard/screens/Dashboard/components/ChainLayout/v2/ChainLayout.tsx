import {
  RequestsWidget,
  MethodCallsWidget,
  BaseTable,
} from '@ankr.com/telemetry';
import { t } from '@ankr.com/common';

import { ChainLayoutProps } from '../types';
import { EmptyLayoutGuard } from '../../EmptyLayoutGuard';
import { useChainData } from './hooks/useChainData';
import { useChartTranslations } from '../../../useChartsTranslations';
import { useChainLayoutStylesV2 } from './ChainLayoutStylesV2';

export const ChainLayout = ({
  detailsChainId,
  selectedProjectId,
  statsChainId,
  timeframe,
}: ChainLayoutProps) => {
  const {
    allTimeTotalRequestsNumber,
    blockHeight,
    countries,
    ipRequests,
    isLoadingTotalStats,
    methodCalls,
    requestsChartData,
    responseError,
    responses,
    totalRequestsNumber,
  } = useChainData({
    statsChainId,
    detailsChainId,
    timeframe,
    selectedProjectId,
  });

  const { methodCallsChartTranslations, requestsChartTranslations } =
    useChartTranslations({
      timeframe,
      totalRequestsNumber,
      allTimeTotalRequestsNumber,
    });

  const { classes } = useChainLayoutStylesV2(false);

  const hasError = Boolean(responseError);
  const hasNoRequests =
    allTimeTotalRequestsNumber === 0 && !isLoadingTotalStats;

  return (
    <EmptyLayoutGuard hasPlaceholder={hasError || hasNoRequests}>
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
          className={classes.responses}
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

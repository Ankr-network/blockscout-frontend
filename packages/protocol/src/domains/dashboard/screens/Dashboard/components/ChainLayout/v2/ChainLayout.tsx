import {
  RequestsWidget,
  MethodCallsWidget,
  BaseTable,
} from '@ankr.com/telemetry';
import { t } from '@ankr.com/common';

import { ChainLayoutProps } from '../types';
import { EmptyLayoutGuard } from '../../EmptyLayoutGuard';
import { RequestsWidgetPlaceholder } from '../../RequestsWidgetPlaceholder';
import { WidgetPlaceholder } from '../../WidgetPlaceholder';
import { useChainData } from './hooks/useChainData';
import { useChainLayoutStylesV2 } from './ChainLayoutStylesV2';
import { useChartTranslations } from '../../../useChartsTranslations';

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
    methodCalls,
    requestsChartData,
    responseError,
    responses,
    totalRequestsNumber,
    totalStatsLoading,
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
  const hasNoRequests = allTimeTotalRequestsNumber === 0 && !totalStatsLoading;

  return (
    <EmptyLayoutGuard hasPlaceholder={hasError || hasNoRequests}>
      <div className={classes.root}>
        <RequestsWidget
          NoDataPlaceholder={RequestsWidgetPlaceholder}
          className={classes.requests}
          data={requestsChartData}
          isLoading={totalStatsLoading}
          timeframe={timeframe}
          translation={requestsChartTranslations}
        />
        <MethodCallsWidget
          NoDataPlaceholder={WidgetPlaceholder}
          blockHeight={blockHeight}
          className={classes.methods}
          isLoading={totalStatsLoading}
          requests={methodCalls}
          timeframe={timeframe}
          total={totalRequestsNumber}
          translation={methodCallsChartTranslations}
        />
        <BaseTable
          NoDataPlaceholder={WidgetPlaceholder}
          className={classes.ipRequests}
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
          className={classes.responses}
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
          className={classes.countries}
          data={countries}
          headingTitles={[
            t('dashboard.top-countries.country'),
            t('dashboard.top-countries.requests'),
          ]}
          isLoading={totalStatsLoading}
          title={t('dashboard.top-countries.title')}
        />
      </div>
    </EmptyLayoutGuard>
  );
};

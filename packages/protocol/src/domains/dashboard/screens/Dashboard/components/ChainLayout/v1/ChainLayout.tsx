import {
  RequestsWidget,
  MethodCallsWidget,
  BaseTable,
} from '@ankr.com/telemetry';
import { t } from '@ankr.com/common';

import { useProjectSelect } from 'modules/common/components/ProjectSelect/hooks/useProjectSelect';

import { ChainLayoutProps } from '../types';
import { EmptyLayoutGuard } from '../../EmptyLayoutGuard';
import { RequestsWidgetPlaceholder } from '../../RequestsWidgetPlaceholder';
import { WidgetPlaceholder } from '../../WidgetPlaceholder';
import { useChainData } from './hooks/useChainData';
import { useChainLayoutStyles } from '../ChainLayoutStyles';
import { useChartTranslations } from '../../../useChartsTranslations';

export const ChainLayout = ({
  detailsChainId,
  statsChainId,
  timeframe,
}: ChainLayoutProps) => {
  const {
    allTimeTotalRequestsNumber,
    blockHeight,
    chainStats,
    countries,
    ipRequests,
    methodCalls,
    privateStatsLoading,
    requestsChartData,
    top10StatsLoading,
    totalRequestsNumber,
    totalStatsLoading,
  } = useChainData({ statsChainId, detailsChainId, timeframe });

  const { methodCallsChartTranslations, requestsChartTranslations } =
    useChartTranslations({
      timeframe,
      totalRequestsNumber,
      allTimeTotalRequestsNumber,
    });

  const { hasSelectedProject } = useProjectSelect();

  const { classes } = useChainLayoutStyles(hasSelectedProject);

  const hasNoRequests = allTimeTotalRequestsNumber === 0;

  return (
    <EmptyLayoutGuard hasPlaceholder={hasNoRequests && !totalStatsLoading}>
      <div className={classes.root}>
        <RequestsWidget
          NoDataPlaceholder={RequestsWidgetPlaceholder}
          timeframe={timeframe}
          data={requestsChartData}
          className={classes.requests}
          isLoading={privateStatsLoading}
          translation={requestsChartTranslations}
        />
        <MethodCallsWidget
          NoDataPlaceholder={WidgetPlaceholder}
          blockHeight={blockHeight}
          className={classes.methods}
          isLoading={privateStatsLoading}
          requests={methodCalls}
          timeframe={timeframe}
          total={chainStats?.total.count}
          translation={methodCallsChartTranslations}
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
      </div>
    </EmptyLayoutGuard>
  );
};

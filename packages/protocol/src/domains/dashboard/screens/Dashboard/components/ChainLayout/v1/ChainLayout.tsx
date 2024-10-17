import {
  RequestsWidget,
  MethodCallsWidget,
  BaseTable,
} from '@ankr.com/telemetry';
import { t } from '@ankr.com/common';

import { useProjectSelect } from 'modules/common/components/ProjectSelect/hooks/useProjectSelect';

import { ChainLayoutProps } from '../types';
import { EmptyLayoutGuard } from '../../EmptyLayoutGuard';
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
    isLoadingTotalStats,
    methodCalls,
    requestsChartData,
    totalRequestsNumber,
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
    <EmptyLayoutGuard hasPlaceholder={hasNoRequests && !isLoadingTotalStats}>
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
          total={chainStats?.total.count}
          requests={methodCalls}
          timeframe={timeframe}
          isLoading={false}
          blockHeight={blockHeight}
          translation={methodCallsChartTranslations}
        />
        {!hasSelectedProject && (
          <BaseTable
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
            headingTitles={[
              t('dashboard.top-countries.country'),
              t('dashboard.top-countries.requests'),
            ]}
            title={t('dashboard.top-countries.title')}
            className={classes.countries}
            data={countries}
          />
        )}
      </div>
    </EmptyLayoutGuard>
  );
};

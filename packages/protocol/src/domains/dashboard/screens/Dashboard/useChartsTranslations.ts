import { t, tHTML } from '@ankr.com/common';
import { useMemo } from 'react';
import { Timeframe } from '@ankr.com/chains-list';

import { timeframesMap } from './const';

interface GetRequestsChartTranslationsProps {
  timeframe: Timeframe;
  totalRequestsNumber: number;
  allTimeTotalRequestsNumber: number;
}

export function getRequestsChartTranslations({
  allTimeTotalRequestsNumber,
  timeframe,
  totalRequestsNumber,
}: GetRequestsChartTranslationsProps) {
  return {
    date: (value: Date) => t('requests-chart.date', { value }),
    time: (value: Date) => t('requests-chart.time', { value }),
    callsCount: (value: number) => t('requests-chart.calls-count', { value }),
    title: t('dashboard.requests-chart.title'),
    placeholderTitle: 'string',
    placeholderSubtitle: 'string',
    requestsTitle: tHTML('dashboard.requests-chart.requests', {
      timeframe: t(
        `dashboard.requests-chart.timeframes.${timeframesMap[timeframe]}`,
      ),
      requests: totalRequestsNumber,
    }),
    allRequestsTitle: tHTML('dashboard.requests-chart.all-requests', {
      requests: allTimeTotalRequestsNumber,
    }),
  };
}

export function getMethodCallsChartTranslation() {
  return {
    downloadButton: t('chain-item.method-calls.download-button'),
    blockHeight: t('dashboard.method-calls.block-height'),
    requests: t('dashboard.method-calls.requests'),
    average: t('dashboard.method-calls.average'),
    noData: t('dashboard.no-data'),
    method: t('dashboard.method-calls.method'),
    title: t('dashboard.method-calls.title'),
    usage: t('dashboard.method-calls.usage'),
    total: (value: number) => t('chain-item.method-calls.y-axis', { value }),
  };
}

interface UseChartTranslationsProps extends GetRequestsChartTranslationsProps {}

export const useChartTranslations = ({
  allTimeTotalRequestsNumber,
  timeframe,
  totalRequestsNumber,
}: UseChartTranslationsProps) => {
  const requestsChartTranslations = useMemo(
    () =>
      getRequestsChartTranslations({
        timeframe,
        totalRequestsNumber,
        allTimeTotalRequestsNumber,
      }),
    [timeframe, totalRequestsNumber, allTimeTotalRequestsNumber],
  );

  const methodCallsChartTranslations = useMemo(
    () => getMethodCallsChartTranslation(),
    [],
  );

  return {
    requestsChartTranslations,
    methodCallsChartTranslations,
  };
};

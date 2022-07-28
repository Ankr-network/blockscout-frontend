import React, { useCallback, useMemo, useRef } from 'react';

import { ChainRequestsChartProps } from './ChainRequestsChartTypes';
import { Chart } from 'modules/common/components/Chart';
import { ChartTooltip } from './ChartTooltip';
import { StatsTimeframe } from 'domains/chains/types';
import { formatDate, processData } from './ChainRequestsChartUtils';
import { t } from 'modules/i18n/utils/intl';

export const ChainRequestsChart = ({
  loading,
  isWalletConnected,
  requestsLog,
  timeframe,
}: ChainRequestsChartProps) => {
  const data = useMemo(
    () => processData(requestsLog, isWalletConnected, timeframe),
    [isWalletConnected, requestsLog, timeframe],
  );
  const timeframeRef = useRef<StatsTimeframe>();
  timeframeRef.current = timeframe;

  const callsFormatter = useCallback(
    (value: number) =>
      t('chain-item.chart.calls-count', {
        value,
      }),
    [],
  );

  const tickFormatter = useCallback(
    value => formatDate(value, timeframeRef.current),
    [],
  );

  return (
    <Chart
      data={data}
      xAxisTickFormatter={tickFormatter}
      yAxisTickFormatter={callsFormatter}
      tooltipContent={<ChartTooltip />}
      loading={loading}
    />
  );
};

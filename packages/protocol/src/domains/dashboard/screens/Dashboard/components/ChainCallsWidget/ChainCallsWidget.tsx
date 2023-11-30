import { BasePieChart } from '@ankr.com/telemetry';
import { t } from '@ankr.com/common';

import { text } from './utils/text';
import { useChainCalls } from './hooks/useChainCalls';

export interface ChainCallsWidgetProps {
  className: string;
}

export const ChainCallsWidget = ({ className }: ChainCallsWidgetProps) => {
  const { data, isLoading, totalRequests } = useChainCalls();

  return (
    <BasePieChart
      amount={t('dashboard.pie-chart.amount', {
        amount: totalRequests.toString(),
      })}
      className={className}
      data={data}
      isLoading={isLoading}
      title={text('title')}
    />
  );
};

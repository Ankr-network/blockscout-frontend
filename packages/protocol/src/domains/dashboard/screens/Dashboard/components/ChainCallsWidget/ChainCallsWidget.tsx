import { BasePieChart, PieChartData } from '@ankr.com/telemetry';
import { t } from '@ankr.com/common';

import { text } from './utils/text';

export interface ChainCallsWidgetProps {
  className: string;
  data: PieChartData[];
  isLoading: boolean;
  totalRequests: number;
}

export const ChainCallsWidget = ({
  className,
  data,
  isLoading,
  totalRequests,
}: ChainCallsWidgetProps) => {
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

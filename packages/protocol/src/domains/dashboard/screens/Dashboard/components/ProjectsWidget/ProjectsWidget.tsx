import { t } from '@ankr.com/common';
import { BasePieChart } from '@ankr.com/telemetry';

import { Timeframe } from 'domains/chains/types';

import { text } from './utils/text';
import { useProjectsData } from './hooks/useProjectsData';

export interface ProjectsWidgetProps {
  className: string;
  timeframe: Timeframe;
}

export const ProjectsWidget = ({
  className,
  timeframe,
}: ProjectsWidgetProps) => {
  const { amount, data, isLoading } = useProjectsData(timeframe);

  return (
    <BasePieChart
      amount={t('dashboard.pie-chart.amount', { amount: amount.toString() })}
      className={className}
      data={data}
      isLoading={isLoading}
      title={text('title')}
    />
  );
};

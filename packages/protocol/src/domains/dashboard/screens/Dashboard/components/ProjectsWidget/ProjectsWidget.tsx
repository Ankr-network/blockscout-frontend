import { Timeframe } from 'domains/chains/types';

import { BasePieChart } from '../BasePieChart';
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
      amount={amount}
      className={className}
      data={data}
      isLoading={isLoading}
      title={text('title')}
    />
  );
};

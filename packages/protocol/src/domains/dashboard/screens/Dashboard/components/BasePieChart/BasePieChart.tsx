import { Paper } from '@mui/material';

import { Chart } from './components/Chart';
import { Legend } from './components/Legend';
import { NoDataGuard, useNoDataContainerStyles } from '../NoDataGuard';
import { PieChartData } from './types';
import { Title } from '../Title';
import { useBasePieChartStyles } from './BasePieChartStyles';
import { ScrollableContainer } from '../ScrollableContainer';

export interface BasePieChartProps {
  amount: string;
  className?: string;
  data: PieChartData[];
  isLoading?: boolean;
  title: string;
}

export const BasePieChart = ({
  amount,
  className,
  data,
  isLoading,
  title,
}: BasePieChartProps) => {
  const { classes, cx } = useBasePieChartStyles();
  const {
    classes: { container },
  } = useNoDataContainerStyles(data.length === 0);

  return (
    <ScrollableContainer
      View={Paper}
      className={className}
      viewClassName={cx(classes.root, container)}
    >
      <Title className={classes.title}>{title}</Title>
      <NoDataGuard data={data} isLoading={isLoading}>
        <div className={classes.content}>
          <Chart className={classes.chart} amount={amount} data={data} />
          <Legend data={data} />
        </div>
      </NoDataGuard>
    </ScrollableContainer>
  );
};

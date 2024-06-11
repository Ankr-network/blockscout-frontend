import { Paper } from '@mui/material';
import { PieChartData } from '@ankr.com/telemetry';

import { ScrollableContainer } from 'modules/common/components/ScrollableContainer';

import { Chart } from './components/Chart';
import { Legend } from './components/Legend';
import { NoDataGuard, useNoDataContainerStyles } from '../NoDataGuard';
import { Title } from '../Title';
import { useBasePieChartStyles } from './BasePieChartStyles';

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
    <Paper className={cx(classes.root, container, className)}>
      <Title className={classes.title}>{title}</Title>
      <NoDataGuard data={data} isLoading={isLoading}>
        <ScrollableContainer>
          <div className={classes.content}>
            <Chart className={classes.chart} amount={amount} data={data} />
            <Legend data={data} />
          </div>
        </ScrollableContainer>
      </NoDataGuard>
    </Paper>
  );
};

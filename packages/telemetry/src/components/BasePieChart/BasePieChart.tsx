import { Paper, SxProps, Theme } from '@mui/material';

import { Chart } from './components/Chart';
import { Legend } from './components/Legend';
import { NoDataGuard, useNoDataContainerStyles } from '../NoDataGuard';
import { PieChartData } from './types';
import { ScrollableContainer } from '../ScrollableContainer';
import { Title } from '../Title';
import { useBasePieChartStyles } from './BasePieChartStyles';

export interface BasePieChartProps {
  amount: string;
  className?: string;
  data: PieChartData[];
  isLoading?: boolean;
  title: string;
  sx?: SxProps<Theme>;
}

export const BasePieChart = ({
  amount,
  className,
  data,
  isLoading,
  title,
  sx,
}: BasePieChartProps) => {
  const { classes, cx } = useBasePieChartStyles();
  const {
    classes: { container },
  } = useNoDataContainerStyles();

  return (
    <Paper
      sx={sx}
      className={cx(classes.root, className, {
        [container]: data.length === 0,
      })}
    >
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

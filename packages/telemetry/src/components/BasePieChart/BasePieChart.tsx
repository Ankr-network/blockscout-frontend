import { Paper, SxProps, Theme } from '@mui/material';

import { Chart } from './components/Chart';
import { Legend } from './components/Legend';
import { NoDataGuard, useNoDataContainerStyles } from '../NoDataGuard';
import { PieChartData } from './types';
import { ScrollableContainer } from '../ScrollableContainer';
import { Title } from '../Title';
import { useBasePieChartStyles } from './BasePieChartStyles';

export interface BasePieChartProps {
  NoDataPlaceholder?: typeof NoDataGuard;
  amount: string;
  className?: string;
  data: PieChartData[];
  isLoading?: boolean;
  sx?: SxProps<Theme>;
  title: string;
}

export const BasePieChart = ({
  NoDataPlaceholder = NoDataGuard,
  amount,
  className,
  data,
  isLoading,
  sx,
  title,
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
      <NoDataPlaceholder data={data} isLoading={isLoading}>
        <ScrollableContainer>
          <div className={classes.content}>
            <Chart className={classes.chart} amount={amount} data={data} />
            <Legend data={data} />
          </div>
        </ScrollableContainer>
      </NoDataPlaceholder>
    </Paper>
  );
};

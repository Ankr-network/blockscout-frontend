import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';
import { PieChartData } from '@ankr.com/telemetry';

import { getColor } from '../../utils/getColor';
import { text } from '../../utils/text';
import { useChartStyles } from './ChartStyles';

export interface ChartProps {
  className?: string;
  amount: string;
  data: PieChartData[];
  hasOtherValuesSection?: boolean;
  amountClassName?: string;
}

export const Chart = ({
  amount,
  className,
  data,
  hasOtherValuesSection,
  amountClassName = '',
}: ChartProps) => {
  const { classes, cx } = useChartStyles();

  return (
    <div className={cx(classes.root, className)}>
      <ResponsiveContainer height="100%" width="100%">
        <PieChart className={classes.chart}>
          <Pie
            cx="50%"
            cy="50%"
            data={data}
            dataKey="value"
            innerRadius="70%"
            labelLine={false}
            outerRadius="100%"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getColor(index, hasOtherValuesSection)}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <Typography
        className={cx(classes.amount, amountClassName)}
        variant="subtitle2"
      >
        {text('amount', { amount })}
      </Typography>
    </div>
  );
};

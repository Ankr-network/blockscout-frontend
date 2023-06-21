import { LegendItem } from '../LegendItem';
import { PieChartData } from '../../types';
import { useLegendStyles } from './LegendStyles';

export interface LegendProps {
  data: PieChartData[];
}

export const Legend = ({ data }: LegendProps) => {
  const { classes } = useLegendStyles();

  return (
    <div className={classes.root}>
      {data.map((item, index) => (
        <LegendItem data={item} index={index} key={item.name} />
      ))}
    </div>
  );
};
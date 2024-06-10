import { Typography } from '@mui/material';
import { PieChartData } from '@ankr.com/telemetry';

import { getColor } from '../../utils/getColor';
import { getPercent } from '../../utils/getPercent';
import { useLegendItemStyles } from './LegendItemStyles';

export interface LegendItemProps {
  data: PieChartData;
  index: number;
}

export const LegendItem = ({ data, index }: LegendItemProps) => {
  const { name, value } = data;

  const { classes } = useLegendItemStyles(getColor(index));

  return (
    <>
      <div className={classes.row}>
        <div className={classes.dot} />
        <Typography className={classes.name}>{name}</Typography>
      </div>
      <Typography className={classes.percent}>{getPercent(value)}</Typography>
    </>
  );
};

import { Paper } from '@material-ui/core';
import { useStakeStats as useStyles } from './useStakeStats';

export interface IStakeStatsItem {
  label: string;
  value: string;
}

export interface IStakeStats {
  stats: IStakeStatsItem[];
}

export const StakeStats = ({ stats }: IStakeStats) => {
  const classes = useStyles();

  const renderedStats = stats.map(stat => (
    <div className={classes.statistic} key={stat.label}>
      <div className={classes.statisticLabel}>{stat.label}</div>
      <div className={classes.statisticValue}>{stat.value}</div>
    </div>
  ));

  return (
    <Paper variant="elevation">
      <div className={classes.statisticWrapper}>{renderedStats}</div>
    </Paper>
  );
};

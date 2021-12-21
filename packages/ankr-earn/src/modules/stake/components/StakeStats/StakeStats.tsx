import { Paper } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { useStakeStats as useStyles } from './useStakeStats';

export interface IStakeStats {
  stats: Record<string, string>[];
}

export const StakeStats = ({ stats }: IStakeStats) => {
  const classes = useStyles();

  const renderedStats = stats.map(stat => (
    <div className={classes.statistic} key={stat.label}>
      <div className={classes.statisticLabel}>{t(stat.label)}</div>
      <div className={classes.statisticValue}>{t(stat.value)}</div>
    </div>
  ));

  return (
    <Paper variant="elevation">
      <div className={classes.statisticWrapper}>{renderedStats}</div>
    </Paper>
  );
};

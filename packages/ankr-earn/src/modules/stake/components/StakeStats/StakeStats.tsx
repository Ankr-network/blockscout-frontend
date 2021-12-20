import { Paper } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { useStakeStats as useStyles } from './useStakeStats';

export interface IStakeStats {
  stats: Record<string, string>[];
}

export const StakeStats = ({ stats }: IStakeStats) => {
  const classes = useStyles();

  const statsRender = stats.map(stat => (
    <div className={classes.statistic}>
      <div className={classes.statisticLabel}>{t(stat.label)}</div>
      <div className={classes.statisticValue}>{t(stat.value)}</div>
    </div>
  ));

  return (
    <Paper className={classes.box} variant="outlined" square={false}>
      <div className={classes.statisticWrapper}>{statsRender}</div>
    </Paper>
  );
};

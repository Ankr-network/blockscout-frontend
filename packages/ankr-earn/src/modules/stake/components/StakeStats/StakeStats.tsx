import { ButtonBase, Paper } from '@material-ui/core';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';
import { useStakeStats as useStyles } from './useStakeStats';

export interface IStakeStatsItem {
  label: string;
  value: string;
  tooltip?: string;
}

export interface IStakeStats {
  stats: IStakeStatsItem[];
}

export const StakeStats = ({ stats }: IStakeStats) => {
  const classes = useStyles();

  const renderedStats = stats.map(stat => (
    <div className={classes.statistic} key={stat.label}>
      <div className={classes.statisticLabel}>
        {stat.label}
        {stat.tooltip ? (
          <Tooltip title={stat.tooltip} arrow>
            <ButtonBase className={classes.questionBtn}>
              <QuestionIcon size="xs" className={classes.questionIcon} />
            </ButtonBase>
          </Tooltip>
        ) : null}
      </div>
      <div className={classes.statisticValue}>{stat.value}</div>
    </div>
  ));

  return (
    <Paper variant="elevation">
      <div className={classes.statisticWrapper}>{renderedStats}</div>
    </Paper>
  );
};

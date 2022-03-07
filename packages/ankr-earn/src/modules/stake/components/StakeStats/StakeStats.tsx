import { ButtonBase, Paper } from '@material-ui/core';

import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { useStakeStats as useStyles } from './useStakeStats';

export interface IStakeStatsItem {
  label: string;
  value: string;
  tooltip?: string;
  token?: string;
}

export interface IStakeStats {
  stats: IStakeStatsItem[];
}

const ENTER_DELAY = 1_000;

export const StakeStats = ({ stats }: IStakeStats): JSX.Element => {
  const classes = useStyles();

  const renderedStats = stats.map(stat => (
    <div key={stat.label} className={classes.statistic}>
      <div className={classes.statisticLabel}>
        {stat.label}

        {stat.tooltip ? (
          <Tooltip arrow title={stat.tooltip}>
            <ButtonBase className={classes.questionBtn}>
              <QuestionIcon className={classes.questionIcon} size="xs" />
            </ButtonBase>
          </Tooltip>
        ) : null}
      </div>

      <div className={classes.statisticValueWrapper}>
        <Tooltip
          arrow
          enterDelay={ENTER_DELAY}
          title={`${stat.value} ${stat.token ?? ''}`.trim()}
        >
          <div className={classes.statisticValue}>{stat.value}</div>
        </Tooltip>

        <div className={classes.statisticToken}>{stat.token}</div>
      </div>
    </div>
  ));

  return (
    <Paper variant="elevation">
      <div className={classes.statisticWrapper}>{renderedStats}</div>
    </Paper>
  );
};

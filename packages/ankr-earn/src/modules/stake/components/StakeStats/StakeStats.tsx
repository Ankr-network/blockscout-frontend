import { ButtonBase, Paper } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { useStakeStats } from './useStakeStats';
import { useStakeStatsStyles as useStyles } from './useStakeStatsStyles';

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

  const { data } = useStakeStats();

  const renderedStats = stats.map(stat => {
    const currentData = stat.token
      ? data?.services.find(
          service =>
            service.serviceName.toLowerCase() === stat.token?.toLowerCase(),
        )
      : null;

    const totalStakedUsd = currentData
      ? new BigNumber(currentData.totalStakedUsd)
      : ZERO;

    const totalStaked = currentData
      ? new BigNumber(currentData.totalStaked)
      : ZERO;

    const usdRatio =
      currentData && !totalStaked.isZero()
        ? totalStakedUsd.div(totalStaked)
        : ZERO;

    const bnValue = +stat.value.replace(/,/g, '');

    const usdEquiwalent = currentData
      ? Math.floor(usdRatio.multipliedBy(bnValue).toNumber())
      : 0;

    return (
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

        {stat.token ? (
          <div className={classes.usd}>
            ${usdEquiwalent.toLocaleString('en-US')}
          </div>
        ) : null}
      </div>
    );
  });

  return (
    <Paper variant="elevation">
      <div className={classes.statisticWrapper}>{renderedStats}</div>
    </Paper>
  );
};

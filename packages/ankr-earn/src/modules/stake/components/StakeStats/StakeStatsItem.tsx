import { ButtonBase } from '@material-ui/core';
import { ReactText } from 'react';

import { t } from 'common';

import { Milliseconds } from 'modules/common/types';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { useStakeStatsStyles } from './useStakeStatsStyles';

const ENTER_DELAY: Milliseconds = 1_000;

interface IStakeStatsItemProps {
  label: string;
  value: string;
  tooltip?: string;
  token?: string;
  usdEquivalent?: ReactText;
}

export const StakeStatsItem = ({
  label,
  value,
  tooltip,
  token,
  usdEquivalent,
}: IStakeStatsItemProps): JSX.Element => {
  const classes = useStakeStatsStyles();

  const usdEquivalentText = t('stake.stats.usd-equivalent', {
    value: usdEquivalent,
  });

  return (
    <div className={classes.statistic}>
      <div className={classes.statisticLabel}>
        {label}

        {tooltip ? (
          <Tooltip arrow title={tooltip}>
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
          title={t('unit.token-value', { token, value })}
        >
          <div className={classes.statisticValue}>{value}</div>
        </Tooltip>

        {token && <div className={classes.statisticToken}>{token}</div>}
      </div>

      {usdEquivalent && (
        <div className={classes.usd} title={usdEquivalentText}>
          {usdEquivalentText}
        </div>
      )}
    </div>
  );
};

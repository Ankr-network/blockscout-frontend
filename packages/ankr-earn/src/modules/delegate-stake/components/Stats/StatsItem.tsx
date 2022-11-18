import { t } from '@ankr.com/common';
import { ButtonBase } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { ReactText } from 'react';

import { Milliseconds } from 'modules/common/types';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { useStatsStyles } from './useStatsStyles';

const ENTER_DELAY: Milliseconds = 1_000;

interface IStatsItemProps {
  label: string;
  value: ReactText;
  isLoading?: boolean;
  tooltip?: string;
  token?: string;
  usdEquivalent?: ReactText;
}

export const StatsItem = ({
  label,
  value,
  isLoading,
  tooltip,
  token,
  usdEquivalent,
}: IStatsItemProps): JSX.Element => {
  const classes = useStatsStyles();

  const usdEquivalentText = t('unit.usd-value', {
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

      {isLoading ? (
        <Skeleton height={32} width={60} />
      ) : (
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
      )}

      {usdEquivalent && isLoading && <Skeleton width={40} />}

      {usdEquivalent && !isLoading && (
        <div className={classes.usd} title={usdEquivalentText}>
          {usdEquivalentText}
        </div>
      )}
    </div>
  );
};

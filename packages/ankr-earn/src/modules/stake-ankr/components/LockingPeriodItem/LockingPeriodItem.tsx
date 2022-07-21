import { Typography } from '@material-ui/core';

import { t } from 'common';

import { ProgressBar } from 'uiKit/ProgressBar';

import { useLockingPeriodItemStyles } from './useLockingPeriodItemStyles';

interface ILockingPeriodItemProps {
  isUnlocked: boolean;
  daysLeft?: number;
  percent?: number;
  existingStakes?: number;
}

export const LockingPeriodItem = ({
  isUnlocked,
  daysLeft = 0,
  percent = 0,
  existingStakes,
}: ILockingPeriodItemProps): JSX.Element => {
  const classes = useLockingPeriodItemStyles();

  if (existingStakes) {
    return (
      <Typography className={classes.unlockedText}>
        {existingStakes === 1
          ? t('stake-ankr.staking-table.stake-amount', {
              value: existingStakes,
            })
          : t('stake-ankr.staking-table.stakes-amount', {
              value: existingStakes,
            })}
      </Typography>
    );
  }

  if (isUnlocked) {
    return (
      <Typography className={classes.unlockedText}>
        {t('stake-ankr.staking-table.unlocked')}
      </Typography>
    );
  }

  const renderLeftDays = (value: number): string => {
    return value === 1
      ? t('stake-ankr.staking-table.left-day', { value })
      : t('stake-ankr.staking-table.left-days', { value });
  };

  return (
    <div>
      <ProgressBar value={percent} />

      <Typography className={classes.lockPeriodDescription}>
        {renderLeftDays(daysLeft)}
      </Typography>
    </div>
  );
};

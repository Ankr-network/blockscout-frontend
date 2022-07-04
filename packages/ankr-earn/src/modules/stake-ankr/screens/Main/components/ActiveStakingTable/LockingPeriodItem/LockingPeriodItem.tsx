import { Typography } from '@material-ui/core';

import { t } from 'common';

import { ProgressBar } from 'uiKit/ProgressBar';

import { useLockingPeriodItemStyles } from './useLockingPeriodItemStyles';

interface ILockingPeriodItemProps {
  isUnlocked: boolean;
  daysLeft: number;
  percent: number;
}

export const LockingPeriodItem = ({
  isUnlocked,
  daysLeft,
  percent,
}: ILockingPeriodItemProps): JSX.Element => {
  const classes = useLockingPeriodItemStyles();

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

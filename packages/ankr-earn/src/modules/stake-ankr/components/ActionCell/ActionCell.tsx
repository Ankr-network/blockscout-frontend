import { Chip } from '@material-ui/core';

import { t } from 'common';

import { NavLink } from 'uiKit/NavLink';

import { useActionCellStyles } from './useActionCellStyles';

interface IActionCellProps {
  claimLink: string;
  daysLeft: number;
}

export const ActionCell = ({
  claimLink,
  daysLeft,
}: IActionCellProps): JSX.Element => {
  const classes = useActionCellStyles();

  if (daysLeft > 0) {
    return (
      <Chip
        className={classes.chip}
        color="primary"
        label={
          daysLeft === 1
            ? t('stake-ankr.staking-table.left-days', { value: daysLeft })
            : t('stake-ankr.staking-table.left-day', { value: daysLeft })
        }
      />
    );
  }

  return (
    <NavLink className={classes.btn} href={claimLink} variant="outlined">
      {t('stake-ankr.staking-table.claim')}
    </NavLink>
  );
};

import { t } from '@ankr.com/common';
import { Chip } from '@material-ui/core';

import { NavLink } from 'uiKit/NavLink';

import { useActionCellStyles } from './useActionCellStyles';
import { useDaysLeftText } from './useDaysLeftText';

interface IActionCellProps {
  claimLink: string;
  daysLeft: number;
}

export const ActionCell = ({
  claimLink,
  daysLeft,
}: IActionCellProps): JSX.Element => {
  const classes = useActionCellStyles();
  const daysLeftText = useDaysLeftText(daysLeft);

  if (daysLeft > 0) {
    return (
      <Chip className={classes.chip} color="primary" label={daysLeftText} />
    );
  }

  return (
    <NavLink className={classes.btn} href={claimLink} variant="outlined">
      {t('stake-ankr.staking-table.claim')}
    </NavLink>
  );
};

import { t } from '@ankr.com/common';
import { Chip } from '@material-ui/core';

import { NavLink } from 'uiKit/NavLink';
import { Tooltip } from 'uiKit/Tooltip';

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
            ? t('stake-ankr.staking-table.left-day', { value: daysLeft })
            : t('stake-ankr.staking-table.left-days', { value: daysLeft })
        }
      />
    );
  }

  return (
    <Tooltip arrow title={t('common.tooltips.comingSoon')}>
      <span>
        <NavLink
          disabled
          className={classes.btn}
          href={claimLink}
          variant="outlined"
        >
          {t('stake-ankr.staking-table.claim')}
        </NavLink>
      </span>
    </Tooltip>
  );
};

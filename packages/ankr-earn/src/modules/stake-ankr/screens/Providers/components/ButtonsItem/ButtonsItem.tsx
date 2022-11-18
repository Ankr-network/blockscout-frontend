import { t } from '@ankr.com/common';
import { Chip } from '@material-ui/core';

import { NavLink } from 'uiKit/NavLink';

import { useButtonsItemStyles } from './useButtonsItemStyles';

interface IButtonsItemProps {
  stakeLink?: string;
  detailsLink?: string;
  exitDays?: number;
  bondingDays?: number;
}

export const ButtonsItem = ({
  stakeLink,
  detailsLink,
  exitDays,
  bondingDays,
}: IButtonsItemProps): JSX.Element => {
  const classes = useButtonsItemStyles();

  return (
    <div className={classes.root}>
      {stakeLink && (
        <NavLink
          className={classes.button}
          href={stakeLink}
          variant="contained"
        >
          {t('stake-ankr.table.stake')}
        </NavLink>
      )}

      {detailsLink && (
        <NavLink
          className={classes.button}
          href={detailsLink}
          variant="outlined"
        >
          {t('stake-ankr.table.details')}
        </NavLink>
      )}

      {exitDays && (
        <Chip
          className={classes.blueChip}
          color="primary"
          label={
            exitDays === 1
              ? t('stake-ankr.table.exit-day', { value: exitDays })
              : t('stake-ankr.table.exit-days', { value: exitDays })
          }
          size="small"
        />
      )}

      {bondingDays && (
        <Chip
          disabled
          className={classes.greyChip}
          label={
            bondingDays === 1
              ? t('stake-ankr.table.bonding-day', { value: bondingDays })
              : t('stake-ankr.table.bonding-days', { value: bondingDays })
          }
          size="small"
        />
      )}
    </div>
  );
};

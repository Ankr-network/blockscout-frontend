import { t } from 'common';

import { NavLink } from 'uiKit/NavLink';

import { useButtonsItemStyles } from './useButtonsItemStyles';

interface IButtonsItemProps {
  stakeLink?: string;
  detailsLink?: string;
}

export const ButtonsItem = ({
  stakeLink,
  detailsLink,
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
    </div>
  );
};

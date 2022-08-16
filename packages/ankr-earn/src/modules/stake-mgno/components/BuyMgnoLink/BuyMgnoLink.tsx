import { t } from 'common';

import { NavLink } from 'uiKit/NavLink';

import { useBuyMgnoLinkStyles } from './useBuyMgnoLinkStyles';

export const BuyMgnoLink = (): JSX.Element => {
  const classes = useBuyMgnoLinkStyles();

  return (
    <NavLink
      className={classes.balanceLink}
      // todo: change link to actual one
      href="test"
      variant="text"
    >
      {t('delegated-stake.staking.get-mgno')}
    </NavLink>
  );
};

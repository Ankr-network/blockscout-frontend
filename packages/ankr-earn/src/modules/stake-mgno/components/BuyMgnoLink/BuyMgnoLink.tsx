import { t } from '@ankr.com/common';

import { CONVERT_MGNO_MANUAL_LINK } from 'modules/common/const';
import { NavLink } from 'uiKit/NavLink';

import { useBuyMgnoLinkStyles } from './useBuyMgnoLinkStyles';

export const BuyMgnoLink = (): JSX.Element => {
  const classes = useBuyMgnoLinkStyles();

  return (
    <NavLink
      className={classes.balanceLink}
      href={CONVERT_MGNO_MANUAL_LINK}
      variant="text"
    >
      {t('delegated-stake.staking.get-mgno')}
    </NavLink>
  );
};

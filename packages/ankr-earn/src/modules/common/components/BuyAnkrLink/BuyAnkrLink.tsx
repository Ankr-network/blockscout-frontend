import { t } from '@ankr.com/common';

import { ANKR_1INCH_BUY_LINK } from 'modules/common/const';
import { NavLink } from 'uiKit/NavLink';

import { useBuyAnkrLinkStyles } from './useBuyAnkrLinkStyles';

export const BuyAnkrLink = (): JSX.Element => {
  const classes = useBuyAnkrLinkStyles();

  return (
    <NavLink
      className={classes.balanceLink}
      href={ANKR_1INCH_BUY_LINK}
      variant="text"
    >
      {t('unstake-dialog.get-ankr')}
    </NavLink>
  );
};

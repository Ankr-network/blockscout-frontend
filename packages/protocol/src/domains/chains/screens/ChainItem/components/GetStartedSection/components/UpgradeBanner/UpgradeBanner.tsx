import { NavLink } from 'ui';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { root } from '../../const';
import { t } from 'modules/i18n/utils/intl';
import { useUpgradeBannerStyles } from './UpgradeBannerStyles';

const href = AccountRoutesConfig.accountDetails.generatePath();
const message = t(`${root}.upgrade-banner.message`);
const button = t(`${root}.upgrade-banner.button`);

export const UpgradeBanner = () => {
  const classes = useUpgradeBannerStyles();

  return (
    <div className={classes.upgradeBanner}>
      <div className={classes.content}>
        <div className={classes.message}>{message}</div>
        <NavLink className={classes.button} href={href} variant="contained">
          {button}
        </NavLink>
      </div>
    </div>
  );
};

import React from 'react';
import { useBannerStyles } from './useBannerStyles';
import { ReactComponent as InfoIcon } from './assets/info.svg';
import { t } from 'modules/i18n/utils/intl';
import { NavLink } from 'ui';
import { AccountRoutesConfig } from 'domains/account/Routes';

export const ContentBanner = () => {
  const classes = useBannerStyles();

  return (
    <div className={classes.root}>
      <div className={classes.banner}>
        <div className={classes.top}>
          <div className={classes.icon}>
            <InfoIcon />
          </div>
          <div className={classes.content}>
            {t('chains.banner.chain-item.top')}
          </div>
        </div>
        <div className={classes.bottom}>
          <div className={classes.message}>
            {t('chains.banner.chain-item.message')}
          </div>
          <NavLink
            className={classes.button}
            href={AccountRoutesConfig.accountDetails.generatePath()}
            variant="contained"
          >
            {t('chains.banner.chain-item.button')}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useBannerStyles } from './useBannerStyles';
import { ReactComponent as InfoIcon } from './assets/info.svg';
import { ReactComponent as ArrowIcon } from './assets/arrow.svg';
import { t } from 'modules/i18n/utils/intl';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { NavLink } from 'ui';

export const InfoBanner = () => {
  const classes = useBannerStyles();

  return (
    <div className={classes.root}>
      <div className={classes.info}>
        <div className={classes.icon}>
          <InfoIcon />
        </div>
        <div className={classes.content}>
          <span className={classes.text}>{t('chains.banner.dashbaord')}</span>
          <NavLink
            className={classes.link}
            href={AccountRoutesConfig.accountDetails.generatePath()}
          >
            {t('chains.banner.premium-plan')}
            <ArrowIcon className={classes.icon} />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

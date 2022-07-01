import React from 'react';
import { useBannerStyles } from './useBannerStyles';
import { ReactComponent as InfoIcon } from 'assets/img/info.svg';
import { tHTML } from 'modules/i18n/utils/intl';

export const Banner = () => {
  const classes = useBannerStyles();
  return (
    <div className={classes.root}>
      <InfoIcon />
      <div className={classes.content}>
        {tHTML('chain-item.rate-limit-banner')}
      </div>
    </div>
  );
};

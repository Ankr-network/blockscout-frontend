import React from 'react';
import { useBannerStyles } from './useBannerStyles';
import { tHTML } from 'modules/i18n/utils/intl';

export const Banner = () => {
  const classes = useBannerStyles();
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {tHTML('chain-item.rate-limit-banner')}
      </div>
    </div>
  );
};

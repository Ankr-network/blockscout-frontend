import React from 'react';
import { useBannerStyles } from './useBannerStyles';
import { tHTML } from '@ankr.com/common';

export const InfoBanner = () => {
  const { classes } = useBannerStyles();

  return (
    <div className={classes.root}>
      <div className={classes.info}>
        <div className={classes.content}>
          <span className={classes.text}>
            {tHTML('chains.banner.dashboard')}
          </span>
        </div>
      </div>
    </div>
  );
};

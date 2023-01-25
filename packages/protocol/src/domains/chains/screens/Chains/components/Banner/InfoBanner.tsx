import React from 'react';
import { useBannerStyles } from './useBannerStyles';
import { tHTML } from '@ankr.com/common';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

export const InfoBanner = () => {
  const { isLightTheme } = useThemes();

  const { classes } = useBannerStyles(isLightTheme);

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

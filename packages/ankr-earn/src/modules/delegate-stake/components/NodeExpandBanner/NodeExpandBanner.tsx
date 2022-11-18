import { t, tHTML } from '@ankr.com/common';
import { Typography } from '@material-ui/core';

import chainImage from './assets/chains.png';
import { useNodeExpandBannerStyles } from './useNodeExpandBannerStyles';

export const NodeExpandBanner = (): JSX.Element => {
  const classes = useNodeExpandBannerStyles();

  return (
    <div className={classes.bannerWrapper}>
      <img alt="" className={classes.expandLogo} src={chainImage} />

      <Typography className={classes.expandDescription} variant="h2">
        {tHTML('delegated-stake.node-banner')}

        <span className={classes.gradientText}>
          {t('delegated-stake.node-banner-color')}
        </span>
      </Typography>
    </div>
  );
};

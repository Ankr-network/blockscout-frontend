import { Typography } from '@material-ui/core';
import React from 'react';
import { useIsSMDown } from 'ui';
import classNames from 'classnames';
import { t } from 'modules/i18n/utils/intl';
import { SpeedIcon } from 'uiKit/Icons/SpeedIcon';
import { ProtectIcon } from 'uiKit/Icons/ProtectIcon';
import { ForkIcon } from 'uiKit/Icons/ForkIcon';
import { ArrowTopIcon } from 'uiKit/Icons/ArrowTopIcon';
import { ArrowRightIcon } from 'uiKit/Icons/ArrowRightIcon';

import { useStyles } from './ChainBannerStyles';

const ChainBannerUnblockBtn = () => {
  const classes = useStyles();

  return (
    <div className={classes.unblockBtn}>
      <Typography
        className={classes.unblockBtnLabel}
        color="inherit"
        variant="h5"
      >
        {t('chain-item.banner.unlockBtn')}
      </Typography>
      <ArrowRightIcon className={classes.unblockBtnIcon} />
    </div>
  );
};

interface IChainBannerProps {
  className?: string;
}

export const ChainBanner = ({ className }: IChainBannerProps) => {
  const classes = useStyles();
  const isMobile = useIsSMDown();

  // numberjs or own fn to format this count
  const formatedRequestsCount = '57M';

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classNames(classes.block, classes.left)}>
        <Typography className={classes.title} color="inherit" variant="h3">
          {t('chain-item.banner.plan')}
        </Typography>

        {!isMobile && <ChainBannerUnblockBtn />}
      </div>
      <div className={classNames(classes.block, classes.center)}>
        <div>
          <div className={classes.featureBlock}>
            <div className={classes.featureBlockWrapper}>
              <SpeedIcon className={classes.featureBlockIcon} />
              <Typography
                className={classes.featureBlockLabel}
                color="inherit"
                variant="body2"
              >
                {t('chain-item.banner.features.block1')}
              </Typography>
            </div>
          </div>
          <div className={classes.featureBlock}>
            <div className={classes.featureBlockWrapper}>
              <ForkIcon className={classes.featureBlockIcon} />
              <Typography
                className={classes.featureBlockLabel}
                color="inherit"
                variant="body2"
              >
                {t('chain-item.banner.features.block2')}
              </Typography>
            </div>
          </div>
          <div className={classes.featureBlock}>
            <div className={classes.featureBlockWrapper}>
              <ProtectIcon
                className={classNames(
                  classes.protectIcon,
                  classes.featureBlockIcon,
                )}
              />
              <Typography
                className={classes.featureBlockLabel}
                color="inherit"
                variant="body2"
              >
                {t('chain-item.banner.features.block3')}
              </Typography>
            </div>
          </div>
          <div className={classes.featureBlock}>
            <div className={classes.featureBlockWrapper}>
              <ArrowTopIcon className={classes.featureBlockIcon} />
              <Typography
                className={classes.featureBlockLabel}
                color="inherit"
                variant="body2"
              >
                {t('chain-item.banner.features.block4')}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className={classNames(classes.block, classes.right)}>
        {isMobile ? (
          <ChainBannerUnblockBtn />
        ) : (
          <>
            <Typography
              className={classes.rightCount}
              color="inherit"
              variant="h4"
            >
              {formatedRequestsCount}
            </Typography>
            <Typography color="inherit" variant="subtitle1">
              {t('chain-item.banner.requestsPerDay')}
            </Typography>
          </>
        )}
      </div>
    </div>
  );
};

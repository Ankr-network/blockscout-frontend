import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { useIsMDDown } from 'ui';
import classNames from 'classnames';
import { t } from 'modules/i18n/utils/intl';
import { Link } from 'react-router-dom';
import { AccountRoutesConfig } from 'domains/account/Routes';

import { ReactComponent as SpeedIcon } from 'uiKit/Icons/speed.svg';
import { ReactComponent as ProtectIcon } from 'uiKit/Icons/protect.svg';
import { ReactComponent as InfinityIcon } from 'uiKit/Icons/infinity.svg';
import { ReactComponent as ForkIcon } from 'uiKit/Icons/fork.svg';
import { ReactComponent as ArrowTopIcon } from 'uiKit/Icons/arrowTop.svg';

import { useStyles } from './ChainBannerStyles';

const ChainBannerUnblockBtn = () => {
  const classes = useStyles();

  return (
    <Button
      component={Link}
      to={AccountRoutesConfig.accountDetails.generatePath()}
      size="small"
      variant="text"
      className={classes.unblockBtn}
    >
      {t('chain-item.banner.more')}
    </Button>
  );
};

interface IChainBannerProps {
  className?: string;
}

export const ChainBanner = ({ className }: IChainBannerProps) => {
  const classes = useStyles();
  const isMobile = useIsMDDown();

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
              <InfinityIcon
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
                {t('chain-item.banner.features.block4')}
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
                {t('chain-item.banner.features.block5')}
              </Typography>
            </div>
          </div>
        </div>
        {isMobile && <div className={classes.rightOverlay} />}
      </div>
      {isMobile && (
        <div className={classNames(classes.block, classes.right)}>
          <ChainBannerUnblockBtn />
        </div>
      )}
    </div>
  );
};

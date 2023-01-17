import { Button, Typography } from '@mui/material';
import { useIsMDDown } from 'uiKit/Theme/useTheme';
import { t } from '@ankr.com/common';
import { Link } from 'react-router-dom';
import { AccountRoutesConfig } from 'domains/account/Routes';

import { ReactComponent as SpeedIcon } from 'uiKit/Icons/speed.svg';
import { ReactComponent as ProtectIcon } from 'uiKit/Icons/protect.svg';
import { ReactComponent as InfinityIcon } from 'uiKit/Icons/infinity.svg';
import { ReactComponent as ForkIcon } from 'uiKit/Icons/fork.svg';
import { ReactComponent as ArrowTopIcon } from 'uiKit/Icons/arrowTop.svg';

import { useStyles } from './ChainBannerStyles';

const ChainBannerUnblockBtn = () => {
  const { classes } = useStyles();

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
  const { classes, cx } = useStyles();
  const isMobile = useIsMDDown();

  return (
    <div className={cx(classes.root, className)}>
      <div className={cx(classes.block, classes.left)}>
        <Typography className={classes.title} color="inherit" variant="h3">
          {t('chain-item.banner.plan')}
        </Typography>

        {!isMobile && <ChainBannerUnblockBtn />}
      </div>
      <div className={cx(classes.block, classes.center)}>
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
                className={cx(classes.protectIcon, classes.featureBlockIcon)}
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
                className={cx(classes.protectIcon, classes.featureBlockIcon)}
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
        <div className={cx(classes.block, classes.right)}>
          <ChainBannerUnblockBtn />
        </div>
      )}
    </div>
  );
};

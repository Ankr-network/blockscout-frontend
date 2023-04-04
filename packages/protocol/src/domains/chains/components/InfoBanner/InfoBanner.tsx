import { Button, Typography } from '@mui/material';
import { Check } from '@ankr.com/ui';
import { t, tHTML } from '@ankr.com/common';
import {
  PremiumChainDialog,
  PremiumChainDialogV2,
} from '../PremiumChainDialog';
import { useInfoBannerStyles } from './useInfoBannerStyles';
import { useBanner } from 'modules/common/components/UpgradePlanBanner/hooks/useBanner';

const BANNER_PLAN_ITEM_COUNT = 2;

export const InfoBanner = () => {
  const { classes, cx } = useInfoBannerStyles();

  const { isBannerV2, isOpened, handleOpen, handleClose, handleUpgrade } =
    useBanner();

  return (
    <div className={classes.root}>
      <div className={classes.plan}>
        <Typography className={classes.title}>
          {t('chains.free-plan.title')}
          <Typography className={classes.free}>
            {t('chains.free-plan.your-plan')}
          </Typography>
        </Typography>
        <div className={classes.content}>
          {new Array(BANNER_PLAN_ITEM_COUNT).fill('').map((_, index) => (
            <div key={`free_${index + 1}`} className={classes.item}>
              <Check className={classes.startIcon} />
              <Typography className={classes.message}>
                {tHTML(`chains.free-plan.item-${index + 1}`)}
              </Typography>
            </div>
          ))}
        </div>
        <Button
          variant="outlined"
          size="large"
          fullWidth
          disabled
          className={classes.disabledButton}
        >
          {t('chains.free-plan.button')}
        </Button>
      </div>
      <div className={cx(classes.plan, classes.premium)}>
        <div className={classes.premiumContent}>
          <Typography className={classes.title}>
            {t('chains.premium-plan.title')}
          </Typography>
          <div className={classes.content}>
            {new Array(BANNER_PLAN_ITEM_COUNT).fill('').map((_, index) => (
              <div key={`premium_${index + 1}`} className={classes.item}>
                <Check className={classes.startIcon} />
                <Typography className={classes.message}>
                  {tHTML(`chains.premium-plan.item-${index + 1}`)}
                </Typography>
              </div>
            ))}
          </div>
          <Button size="large" fullWidth onClick={handleOpen}>
            {t('chains.premium-plan.button')}
          </Button>
        </div>
      </div>
      {isBannerV2 ? (
        <PremiumChainDialogV2
          open={isOpened}
          onClose={handleClose}
          onUpgrade={handleUpgrade}
        />
      ) : (
        <PremiumChainDialog
          onClose={handleClose}
          onUpgrade={handleUpgrade}
          open={isOpened}
        />
      )}
    </div>
  );
};

import React, { useCallback } from 'react';
import { Button, Typography } from '@mui/material';
import { trackBannerRegister } from 'modules/analytics/mixpanel/utils/trackBannerRegister';
import { BannerFreeToRegisterType } from 'modules/analytics/mixpanel/types';
import { t, tHTML } from '@ankr.com/common';
import { useInfoBannerStyles } from './useInfoBannerStyles';
import { Check } from '@ankr.com/ui';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useIsBannerV2 } from './useIsBannerV2';
import { ChainsItemDialog, ChainsItemDialogV2 } from '../ChainsItemDialog';

const BANNER_PLAN_ITEM_COUNT = 2;

export const InfoBanner = () => {
  const { isBannerV2 } = useIsBannerV2();
  const { classes, cx } = useInfoBannerStyles();

  const { isOpened, onOpen, onClose } = useDialog(isBannerV2);

  const handleOpen = useCallback(() => {
    onOpen();
    trackBannerRegister({ type: BannerFreeToRegisterType.open });
  }, [onOpen]);

  const handleClose = useCallback(() => {
    onClose();
    trackBannerRegister({ type: BannerFreeToRegisterType.close });
  }, [onClose]);

  const handleUpgrade = useCallback(
    () => trackBannerRegister({ type: BannerFreeToRegisterType.register }),
    [],
  );

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
        <ChainsItemDialogV2
          open={isOpened}
          onClose={handleClose}
          onTrack={handleUpgrade}
        />
      ) : (
        <ChainsItemDialog
          open={isOpened}
          onClose={handleClose}
          onTrack={handleUpgrade}
        />
      )}
    </div>
  );
};

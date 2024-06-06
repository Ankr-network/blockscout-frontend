import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';

import { root } from '../../const';
import { useUpgradeBannerStyles } from './UpgradeBannerStyles';

export const UpgradeBanner = () => {
  const { classes } = useUpgradeBannerStyles();

  const { isOpened, onClose, onOpen } = useUpgradePlanDialog();

  return (
    <div className={classes.upgradeBanner}>
      <div className={classes.content}>
        <div className={classes.message}>
          {t(`${root}.upgrade-banner.message`)}
        </div>
        <Button className={classes.button} onClick={onOpen} variant="contained">
          {t(`${root}.upgrade-banner.button`)}
        </Button>
      </div>
      <UpgradePlanDialog onClose={onClose} open={isOpened} />
    </div>
  );
};

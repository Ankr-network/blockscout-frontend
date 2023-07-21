import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';

import { root } from '../../const';
import { useUpgradeBannerStyles } from './UpgradeBannerStyles';

const message = t(`${root}.upgrade-banner.message`);
const button = t(`${root}.upgrade-banner.button`);

export const UpgradeBanner = () => {
  const { classes } = useUpgradeBannerStyles();

  const { isOpened, onOpen, onClose } = useUpgradePlanDialog();

  return (
    <div className={classes.upgradeBanner}>
      <div className={classes.content}>
        <div className={classes.message}>{message}</div>
        <Button className={classes.button} onClick={onOpen} variant="contained">
          {button}
        </Button>
      </div>
      <UpgradePlanDialog onClose={onClose} open={isOpened} />
    </div>
  );
};

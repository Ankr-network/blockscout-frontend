import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import { PremiumChainDialog } from 'domains/chains/components/PremiumChainDialog';
import { root } from '../../const';
import { useUpgradeBannerStyles } from './UpgradeBannerStyles';
import { useDialog } from 'modules/common/hooks/useDialog';

const message = t(`${root}.upgrade-banner.message`);
const button = t(`${root}.upgrade-banner.button`);

export const UpgradeBanner = () => {
  const { classes } = useUpgradeBannerStyles();

  const { isOpened, onOpen, onClose } = useDialog();

  return (
    <div className={classes.upgradeBanner}>
      <div className={classes.content}>
        <div className={classes.message}>{message}</div>
        <Button className={classes.button} onClick={onOpen} variant="contained">
          {button}
        </Button>
      </div>
      <PremiumChainDialog onClose={onClose} open={isOpened} />
    </div>
  );
};

import { Button, Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { ArrowRightSmall } from '@ankr.com/ui';

import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { useUpgradeInfoStyls } from './useUpgradeInfoStyles';

export const UpgradeInfo = () => {
  const { classes } = useUpgradeInfoStyls();

  const { isOpened, onOpen, onClose } = useUpgradePlanDialog();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography className={classes.info}>
          {tHTML('chain-item.locations.upgrade-info')}
        </Typography>
        <Button
          className={classes.button}
          variant="text"
          role="button"
          tabIndex={0}
          onClick={onOpen}
        >
          {t('chain-item.locations.upgrade')} <ArrowRightSmall />
        </Button>
      </div>
      <UpgradePlanDialog onClose={onClose} open={isOpened} />
    </div>
  );
};

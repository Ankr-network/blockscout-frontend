import { Button, Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { ArrowRightSmall } from '@ankr.com/ui';

import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';
import { PlansDialog } from 'modules/common/components/PlansDialog';

import { useUpgradeInfoStyls } from './useUpgradeInfoStyles';

export const UpgradeInfo = () => {
  const { classes } = useUpgradeInfoStyls();

  const { isOpened, onClose, onOpen } = useUpgradePlanDialog();

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
      <PlansDialog onClose={onClose} open={isOpened} />
    </div>
  );
};

import { Button, Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { ArrowRightSmall } from '@ankr.com/ui';

import { useUpgradeInfoStyls } from './useUpgradeInfoStyles';
import { useDialog } from 'modules/common/hooks/useDialog';
import { PremiumChainDialog } from 'domains/chains/components/PremiumChainDialog';

export const UpgradeInfo = () => {
  const { classes } = useUpgradeInfoStyls();

  const { isOpened, onOpen, onClose } = useDialog();

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
      <PremiumChainDialog onClose={onClose} open={isOpened} />
    </div>
  );
};

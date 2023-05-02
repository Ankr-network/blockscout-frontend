import { Button, Typography } from '@mui/material';
import { Check } from '@ankr.com/ui';
import { t, tHTML } from '@ankr.com/common';

import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePremiumContentStyles } from './usePremiumContentStyles';

interface IPremiumContentProps {
  isMultiChain: boolean;
}

export const PremiumContent = ({ isMultiChain }: IPremiumContentProps) => {
  const { classes } = usePremiumContentStyles(isMultiChain);

  const { hasPremium } = useAuth();

  const { isOpened, onOpen, onClose } = useUpgradePlanDialog();

  if (hasPremium) return null;

  return (
    <>
      <div className={classes.root}>
        <div className={classes.content}>
          <Typography className={classes.title}>
            {t('chains.upgrade-premium.title')}
          </Typography>
          <Typography className={classes.item}>
            <Check size="xs" />
            {tHTML('chains.upgrade-premium.item-1')}
          </Typography>
          <Typography className={classes.item}>
            <Check size="xs" />
            {t('chains.upgrade-premium.item-2')}
          </Typography>
          <Typography className={classes.item}>
            <Check size="xs" />
            {t('chains.upgrade-premium.item-3')}
          </Typography>
          <Button fullWidth className={classes.button} onClick={onOpen}>
            {t('chains.upgrade-premium.button')}
          </Button>
        </div>
      </div>
      <UpgradePlanDialog onClose={onClose} open={isOpened} />
    </>
  );
};

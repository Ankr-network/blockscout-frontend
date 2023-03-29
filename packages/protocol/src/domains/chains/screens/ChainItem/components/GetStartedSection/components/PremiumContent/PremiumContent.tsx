import { t, tHTML } from '@ankr.com/common';
import { Button, Typography } from '@mui/material';
import { Check } from '@ankr.com/ui';
import { usePremiumContentStyles } from './usePremiumContentStyles';
import { useDialog } from 'modules/common/hooks/useDialog';
import { PremiumChainDialog } from 'domains/chains/components/PremiumChainDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const PremiumContent = () => {
  const { classes } = usePremiumContentStyles();

  const { hasPremium } = useAuth();

  const { isOpened, onOpen, onClose } = useDialog();

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
      <PremiumChainDialog onClose={onClose} open={isOpened} />
    </>
  );
};

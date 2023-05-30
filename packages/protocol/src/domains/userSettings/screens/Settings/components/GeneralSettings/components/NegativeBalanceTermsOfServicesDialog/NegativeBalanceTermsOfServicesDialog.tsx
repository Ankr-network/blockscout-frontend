import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { Warning } from '@ankr.com/ui';

import { Dialog } from 'uiKit/Dialog';
import { useContactWidget } from 'hooks/useContactWidget';
import { useNegativeBalanceTermsOfServicesDialogStyles } from './useNegativeBalanceTermsOfServicesDialogStyles';
import { useNegativeBalanceTermsOfServicesDialog } from './hooks/useNegativeBalanceTermsOfServicesDialog';

export const NegativeBalanceTermsOfServicesDialog = () => {
  const { classes } = useNegativeBalanceTermsOfServicesDialogStyles();

  const { isOpened, handleClose } = useNegativeBalanceTermsOfServicesDialog();

  const { openContactWidget } = useContactWidget();

  return (
    <Dialog
      open={isOpened}
      onClose={handleClose}
      maxPxWidth={600}
      shouldHideCloseButton
      canCloseDialogByClickOutside={false}
    >
      <Typography variant="h5" className={classes.title}>
        {t('negative-balance-terms-of-services.title')}
      </Typography>
      <Typography variant="body1" className={classes.text}>
        {t('negative-balance-terms-of-services.text-1')}
      </Typography>
      <div className={classes.balance}>
        <Warning className={classes.icon} />
        <Typography variant="subtitle1" className={classes.balanceText}>
          {t('negative-balance-terms-of-services.balance')}
        </Typography>
      </div>
      <Typography className={classes.text}>
        {t('negative-balance-terms-of-services.text-2')}
      </Typography>
      <Typography variant="body2" className={classes.tip}>
        {t('negative-balance-terms-of-services.tip')}
      </Typography>
      <Button
        fullWidth
        size="large"
        className={classes.button}
        onClick={handleClose}
      >
        {t('negative-balance-terms-of-services.confirm-button')}
      </Button>
      <Button
        fullWidth
        variant="outlined"
        size="large"
        onClick={openContactWidget}
      >
        {t('negative-balance-terms-of-services.contact-button')}
      </Button>
    </Dialog>
  );
};

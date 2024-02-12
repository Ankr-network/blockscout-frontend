import { t, tHTML } from '@ankr.com/common';
import { Button, Typography } from '@mui/material';

import { Dialog, IDialogProps } from 'uiKit/Dialog';
import { ANKR_DOCS_INVITE_TEAMMATE_LINK } from 'modules/common/constants/const';

import { useAccessDeniedDialogStyles } from './useAccessDeniedDialogStyles';

export const AccessDeniedDialog = ({
  onClose,
  ...dialogProps
}: IDialogProps) => {
  const { classes } = useAccessDeniedDialogStyles();

  return (
    <Dialog maxPxWidth={600} onClose={onClose} {...dialogProps}>
      <Typography variant="h5" className={classes.title}>
        {t('access-denied-dialog.title')}
      </Typography>

      <Typography
        variant="body2"
        component="p"
        color="textSecondary"
        className={classes.description}
      >
        {tHTML('access-denied-dialog.description', {
          href: ANKR_DOCS_INVITE_TEAMMATE_LINK,
        })}
      </Typography>

      <Button fullWidth size="large" onClick={onClose}>
        {t('access-denied-dialog.done')}
      </Button>
    </Dialog>
  );
};

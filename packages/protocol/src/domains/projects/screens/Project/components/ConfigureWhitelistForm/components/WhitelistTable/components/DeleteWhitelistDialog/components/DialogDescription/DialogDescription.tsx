import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useDialogDescriptionStyles } from './useDialogDescriptionStyles';

export const DialogDescription = () => {
  const { classes } = useDialogDescriptionStyles();

  return (
    <Typography className={classes.root} component="p" variant="body2">
      {t('project.configure-whitelist-form.delete-dialog.description')}
    </Typography>
  );
};

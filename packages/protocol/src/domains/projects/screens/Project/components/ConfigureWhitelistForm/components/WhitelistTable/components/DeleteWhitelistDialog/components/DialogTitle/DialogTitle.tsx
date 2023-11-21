import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useDialogTitleStyles } from './useDialogTitleStyles';

export const DialogTitle = () => {
  const { classes } = useDialogTitleStyles();

  return (
    <Typography className={classes.root} variant="h6">
      {t('project.configure-whitelist-form.delete-dialog.title')}
    </Typography>
  );
};

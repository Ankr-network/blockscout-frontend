import { Box, Typography } from '@mui/material';

import { useEmailContentLoadingStyles } from './useEmailContentLoadingStyles';
import { Google } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

export const EmailContentLoading = () => {
  const { classes } = useEmailContentLoadingStyles();

  return (
    <Box className={classes.root}>
      <Google style={{ width: 80, height: 80 }} />
      <Typography className={classes.title} variant="h3" color="textPrimary">
        {t('signup-modal.google.title')}
      </Typography>
      <Typography color="textSecondary" variant="body2">
        {t('signup-modal.google.description')}
      </Typography>
    </Box>
  );
};

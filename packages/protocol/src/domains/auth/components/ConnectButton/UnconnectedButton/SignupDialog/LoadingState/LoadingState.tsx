import { Box, Typography } from '@mui/material';
import { Google } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { useLoadingStateStyles } from './useLoadingStateStyles';

export const LoadingState = () => {
  const { classes } = useLoadingStateStyles();

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

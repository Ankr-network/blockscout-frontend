import { Box, Typography } from '@material-ui/core';

import { t } from '@ankr.com/common';
import { useEmailContentLoadingStyles } from './useEmailContentLoadingStyles';
import { ReactComponent as GoogleIcon } from 'uiKit/Icons/google.svg';

export const EmailContentLoading = () => {
  const classes = useEmailContentLoadingStyles();

  return (
    <Box className={classes.root}>
      <GoogleIcon width={80} height={80} />
      <Typography className={classes.title} variant="h3" color="textPrimary">
        {t('signup-modal.google.title')}
      </Typography>
      <Typography
        className={classes.description}
        color="textSecondary"
        variant="body2"
      >
        {t('signup-modal.google.description')}
      </Typography>
    </Box>
  );
};

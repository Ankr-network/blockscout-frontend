import { Box, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useEmptyMessageStyles } from './EmptyMessageStyles';

export const EmptyMessage = () => {
  const { classes } = useEmptyMessageStyles();

  return (
    <Box className={classes.root}>
      <Typography className={classes.message} variant="body2">
        {t('chain-item.usage-data.last-requests.empty')}
      </Typography>
    </Box>
  );
};

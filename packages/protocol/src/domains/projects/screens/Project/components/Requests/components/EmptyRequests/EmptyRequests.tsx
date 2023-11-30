import { Box, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { NoDataCoinStack } from '@ankr.com/ui';
import { Variant } from '@mui/material/styles/createTypography';

import { useEmptyLayoutStyles } from './EmptyRequestsStyles';

export const EmptyRequests = () => {
  const { classes } = useEmptyLayoutStyles();

  return (
    <Box className={classes.root}>
      <NoDataCoinStack className={classes.icon} />
      <Typography variant={'body3' as Variant} color="textSecondary">
        {t('project.total-requests.empty')}
      </Typography>
    </Box>
  );
};

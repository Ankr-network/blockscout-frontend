import { Box } from '@mui/material';
import { t } from '@ankr.com/common';

import { PrivateRequestsTable } from 'domains/chains/components/PrivateRequestsTable';

import { useLastUserRequestsStyles } from './LastUserRequestsStyles';

export const LastUserRequests = () => {
  const { classes } = useLastUserRequestsStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        {t('chain-item.usage-data.last-requests.title')}
      </Box>
      <PrivateRequestsTable />
    </Box>
  );
};

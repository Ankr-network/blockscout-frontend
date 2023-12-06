import { Box } from '@mui/material';

import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';

import { useAuthData } from '../hooks/useAuthData';

export const ClientsPage = () => {
  useSetBreadcrumbs([
    {
      title: 'clients',
    },
  ]);

  useAuthData();

  return <Box>Start searching for a Client by filling in the inputs above</Box>;
};

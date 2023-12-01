import { Box } from '@mui/material';

import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';

export const ClientsPage = () => {
  useSetBreadcrumbs([
    {
      title: 'clients',
    },
  ]);

  return <Box>Start searching for a Client by filling in the inputs above</Box>;
};

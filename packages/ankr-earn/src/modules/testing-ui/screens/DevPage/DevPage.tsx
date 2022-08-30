import { Box } from '@material-ui/core';

import { EmptyState } from 'modules/dashboard/components/EmptyState';
import { Container } from 'uiKit/Container';

/**
 * Remove after https://ankrnetwork.atlassian.net/browse/STAKAN-1810
 */
export const DevPage = (): JSX.Element => {
  return (
    <Box py={6}>
      <Container>
        <EmptyState />
      </Container>
    </Box>
  );
};

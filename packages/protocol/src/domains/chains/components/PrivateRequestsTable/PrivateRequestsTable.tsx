import { Box } from '@mui/material';
import { LatestRequest } from 'multirpc-sdk';

import { Queries } from 'modules/common/components/Queries/Queries';
import { Table } from './components/Table';
import { TableVariant } from './types';
import { usePrivateLatestRequests } from 'domains/chains/hooks/usePrivateLatestRequests';
import { usePrivateRequestsTableStyles } from './PrivateRequestsTableStyles';

export interface PrivateRequestsTableProps {
  hasPolling?: boolean;
  hasTableHead?: boolean;
  variant?: TableVariant;
}

export const PrivateRequestsTable = ({
  hasPolling = true,
  hasTableHead = true,
  variant = TableVariant.Default,
}: PrivateRequestsTableProps) => {
  const latestRequestsState = usePrivateLatestRequests({ hasPolling });

  const { classes } = usePrivateRequestsTableStyles();

  return (
    <Box className={classes.root}>
      <Queries<LatestRequest[]>
        disableErrorRender
        isPreloadDisabled
        queryStates={[latestRequestsState]}
      >
        {({ data, error, isUninitialized }) => (
          <Table
            data={data}
            error={error}
            hasHeader={hasTableHead}
            isUninitialized={isUninitialized}
            variant={variant}
          />
        )}
      </Queries>
    </Box>
  );
};

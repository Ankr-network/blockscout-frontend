import React from 'react';
import { Box, LinearProgress } from '@material-ui/core';
import { Query } from '@redux-requests/react';

import { fetchCredentialsStatus } from 'domains/auth/actions/fetchCredentialsStatus';
import { getProgressValue } from './WaitConfirmationBlockUtils';

export const WaitConfirmationBlock = () => {
  return (
    <Query
      type={fetchCredentialsStatus.toString()}
      action={fetchCredentialsStatus}
      showLoaderDuringRefetch={false}
    >
      {({ data }) => {
        if (data?.isReady || typeof data.remainingBlocks === 'undefined') {
          return null;
        }

        return (
          <Box mt={3} mb={4}>
            <LinearProgress
              variant="determinate"
              value={getProgressValue(data.remainingBlocks)}
            />
          </Box>
        );
      }}
    </Query>
  );
};

import * as React from 'react';
import { Typography } from '@material-ui/core';

import { extractMessage } from '../../utils/extractError';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

interface Props {
  error: FetchBaseQueryError | SerializedError;
}

export const QueryError = ({ error }: Props) => {
  const message = extractMessage(error);

  return (
    <Typography variant="h3" color="error">
      {message}
    </Typography>
  );
};

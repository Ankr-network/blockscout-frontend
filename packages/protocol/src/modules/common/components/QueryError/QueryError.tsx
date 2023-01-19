import { Typography } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import { extractMessage } from '../../utils/extractError';

interface Props {
  error: FetchBaseQueryError | SerializedError;
}

export const QueryError = ({ error }: Props) => {
  const message = extractMessage(error);

  return (
    <Typography variant="h3" color="error" style={{ fontSize: 30 }}>
      {message}
    </Typography>
  );
};

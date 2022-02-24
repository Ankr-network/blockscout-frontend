import * as React from 'react';
import { Typography } from '@material-ui/core';
import { ErrorProps } from '@redux-requests/react';

import { extractMessage } from '../../utils/extractError';

interface ILoadingProps extends ErrorProps {}

export const QueryError = (props: ILoadingProps) => {
  const message = extractMessage(props);

  return (
    <Typography variant="h3" color="error">
      {message}
    </Typography>
  );
};

import { Box, BoxProps } from '@material-ui/core';
import { ErrorProps } from '@redux-requests/react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getErrorMessage } from 'modules/common/utils/getErrorMessage';
import { showNotification } from 'modules/notifications';

interface ILoadingProps extends ErrorProps, BoxProps {}

export const QueryError = ({
  error,
  ...boxProps
}: ILoadingProps): JSX.Element => {
  const message = getErrorMessage({ error });
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      dispatch(
        showNotification({
          message,
          variant: 'error',
        }),
      );
    }
  }, [dispatch, message]);

  return <Box {...boxProps}>{message}</Box>;
};

import * as React from 'react';
import { Spinner } from 'uiKit/Spinner';
import { LoadingProps } from '@redux-requests/react';
import { Box } from '@material-ui/core';

interface IQueryLoadingProps extends LoadingProps {
  size?: number;
}

export const QueryLoading = ({ size }: IQueryLoadingProps) => {
  return <Spinner size={size} />;
};

export const QueryLoadingAbsolute = ({ size }: IQueryLoadingProps) => {
  return <Spinner centered={true} size={size} />;
};

export const QueryLoadingCentered = ({ size }: IQueryLoadingProps) => {
  return (
    <Box display="flex" justifyContent="center">
      <Spinner size={size} />
    </Box>
  );
};

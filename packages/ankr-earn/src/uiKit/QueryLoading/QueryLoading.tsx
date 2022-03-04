import { Box } from '@material-ui/core';
import { LoadingProps } from '@redux-requests/react';

import { Spinner } from 'uiKit/Spinner';

interface IQueryLoadingProps extends LoadingProps {
  size?: number;
}

export const QueryLoading = ({ size }: IQueryLoadingProps): JSX.Element => {
  return <Spinner size={size} />;
};

export const QueryLoadingAbsolute = ({
  size,
}: IQueryLoadingProps): JSX.Element => {
  return <Spinner centered size={size} />;
};

export const QueryLoadingCentered = ({
  size,
}: IQueryLoadingProps): JSX.Element => {
  return (
    <Box display="flex" justifyContent="center">
      <Spinner size={size} />
    </Box>
  );
};

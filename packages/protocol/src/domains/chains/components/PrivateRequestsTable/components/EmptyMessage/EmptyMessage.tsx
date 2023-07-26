import { Box, Typography } from '@mui/material';

import { TableVariant } from '../../types';
import { useEmptyMessageStyles } from './EmptyMessageStyles';
import { getMessage } from './EmptyMessageUtils';

export interface EmptyMessageProps {
  variant: TableVariant;
}

export const EmptyMessage = ({ variant }: EmptyMessageProps) => {
  const { classes } = useEmptyMessageStyles();

  return (
    <Box className={classes.root}>
      <Typography className={classes.message} variant="body2">
        {getMessage(variant)}
      </Typography>
    </Box>
  );
};

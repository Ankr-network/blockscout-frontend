import { Box, Typography } from '@mui/material';
import { NoDataCoinStack } from '@ankr.com/ui';
import { ReactNode } from 'react';

import { useDataPlaceholderStyles } from './useDataPlaceholderStyles';

export interface IDataPlaceholderProps {
  children?: ReactNode;
  className?: string;
  text: string;
}

export const DataPlaceholder = ({
  children,
  className,
  text,
}: IDataPlaceholderProps) => {
  const { classes, cx } = useDataPlaceholderStyles();

  return (
    <Box className={cx(classes.root, className)}>
      <NoDataCoinStack className={classes.icon} size={28} />
      <Typography className={classes.text} variant="body3">
        {text}
      </Typography>
      {children}
    </Box>
  );
};

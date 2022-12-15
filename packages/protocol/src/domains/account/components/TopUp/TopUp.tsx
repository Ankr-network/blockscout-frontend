import { ReactNode } from 'react';
import { Box } from '@material-ui/core';

import { useTopUpStyles } from './TopUpStyles';
import { TopUpBlockHeader } from './TopUpBlockHeader';

export interface TopUpProps {
  header?: ReactNode;
  children: ReactNode;
}

export const TopUp = ({
  header = <TopUpBlockHeader />,
  children,
}: TopUpProps) => {
  const classes = useTopUpStyles({});

  return (
    <Box className={classes.root}>
      {header}
      {children}
    </Box>
  );
};

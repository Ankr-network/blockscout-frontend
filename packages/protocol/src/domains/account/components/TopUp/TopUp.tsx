import { ReactNode } from 'react';
import { Box } from '@mui/material';

import { useTopUpStyles } from './TopUpStyles';
import { TopUpBlockHeader } from './TopUpBlockHeader';

export interface TopUpProps {
  children: ReactNode;
  className?: string;
  header?: ReactNode;
}

export const TopUp = ({
  children,
  className,
  header = <TopUpBlockHeader />,
}: TopUpProps) => {
  const { classes, cx } = useTopUpStyles({});

  return (
    <Box className={cx(classes.root, className)}>
      {header}
      {children}
    </Box>
  );
};

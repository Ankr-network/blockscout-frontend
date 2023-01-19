import { ReactNode } from 'react';
import { Box } from '@mui/material';

import { useTopUpStyles } from './TopUpStyles';
import { TopUpBlockHeader } from './TopUpBlockHeader';

export interface TopUpProps {
  header?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const TopUp = ({
  header = <TopUpBlockHeader />,
  children,
  className,
}: TopUpProps) => {
  const { classes, cx } = useTopUpStyles({});

  return (
    <Box className={cx(classes.root, className)}>
      {header}
      {children}
    </Box>
  );
};

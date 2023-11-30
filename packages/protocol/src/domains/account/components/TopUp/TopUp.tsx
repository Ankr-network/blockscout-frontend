import { ReactNode } from 'react';
import { Box } from '@mui/material';

import { useTopUpStyles } from './TopUpStyles';
import { TopUpBlockHeader } from './TopUpBlockHeader';

export interface TopUpProps {
  children: ReactNode;
  className?: string;
  header?: ReactNode;
  hasHeader?: boolean;
}

export const TopUp = ({
  children,
  className,
  hasHeader,
  header,
}: TopUpProps) => {
  const { classes, cx } = useTopUpStyles({});

  return (
    <Box className={cx(classes.root, className)}>
      {header || <TopUpBlockHeader hasHeader={hasHeader} />}
      {children}
    </Box>
  );
};

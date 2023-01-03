import classNames from 'classnames';
import { ReactNode } from 'react';
import { Box } from '@material-ui/core';

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
  const classes = useTopUpStyles({});

  return (
    <Box className={classNames(classes.root, className)}>
      {header}
      {children}
    </Box>
  );
};

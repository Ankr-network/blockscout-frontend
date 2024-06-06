import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { useAccountItemStyles } from './useAccountItemStyles';

interface AccountsItemProps {
  name: string;
  onClick: () => void;
  isSelected: boolean;
  children: ReactNode;
}

export const AccountItem = ({
  children,
  isSelected,
  name,
  onClick,
}: AccountsItemProps) => {
  const { classes, cx } = useAccountItemStyles();

  return (
    <Box
      className={cx(classes.root, isSelected ? classes.active : '')}
      onClick={onClick}
    >
      {children}
      <Typography
        className={classes.title}
        variant="body2"
        color="textPrimary"
        noWrap
      >
        {name}
      </Typography>
    </Box>
  );
};

import { Button, MenuItem, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { useGoogleMenuItemStyles } from './useMenuItemButtonStyles';

interface MenuItemButtonProps {
  onClick: () => void;
  isLoading: boolean;
  title: string;
  content?: string;
  icon?: ReactNode;
}

export const MenuItemButton = ({
  content,
  icon,
  isLoading,
  onClick,
  title,
}: MenuItemButtonProps) => {
  const { classes } = useGoogleMenuItemStyles();

  return (
    <MenuItem disabled={isLoading} className={classes.root}>
      {content && (
        <Typography
          noWrap
          className={classes.content}
          variant="body2"
          color="textSecondary"
          component="div"
        >
          {content}
        </Typography>
      )}
      <Button
        startIcon={icon}
        className={classes.connectWalletButton}
        variant="text"
        size="large"
        fullWidth={!content}
        onClick={onClick}
        classes={{
          startIcon: classes.walletIcon,
        }}
      >
        {title}
      </Button>
    </MenuItem>
  );
};

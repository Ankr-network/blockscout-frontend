import { MenuItem as BaseMenuItem, Button, Typography } from '@mui/material';
import { ReactNode, useCallback } from 'react';

import { useMenuButtonStyles } from './useMenuButtonStyles';

interface MenuItemProps {
  startIcon?: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const MenuItem = ({
  startIcon,
  children,
  disabled,
  onClick,
}: MenuItemProps) => {
  const { classes } = useMenuButtonStyles({
    isOpened: undefined,
    isLightTheme: undefined,
  });

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (typeof onClick === 'function') {
        onClick();
      }
    },
    [onClick],
  );

  return (
    <BaseMenuItem
      variant="text"
      disabled={disabled}
      className={classes.menuItem}
      startIcon={<div className={classes.menuItemIcon}>{startIcon}</div>}
      component={Button}
      onClick={handleClick}
    >
      <Typography variant="body2" className={classes.menuItemText}>
        {children}
      </Typography>
    </BaseMenuItem>
  );
};

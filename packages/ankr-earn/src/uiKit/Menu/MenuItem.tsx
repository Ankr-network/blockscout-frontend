import { MenuItem as MenuItemUI } from '@material-ui/core';
import { ReactNode } from 'react';

import { useMenuStyles } from './useMenuStyles';

export interface IMenuItemProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const MenuItem = ({
  children,
  disabled = false,
  onClick,
}: IMenuItemProps): JSX.Element => {
  const classes = useMenuStyles();

  return (
    <MenuItemUI
      className={classes.menuItem}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </MenuItemUI>
  );
};

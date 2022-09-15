import { MenuItem as MenuItemUI } from '@material-ui/core';
import { ForwardedRef, forwardRef, ReactNode } from 'react';

import { useMenuStyles } from './useMenuStyles';

export interface IMenuItemProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const MenuItem = forwardRef(
  (
    { children, disabled = false, onClick }: IMenuItemProps,
    ref: ForwardedRef<HTMLLIElement>,
  ): JSX.Element => {
    const classes = useMenuStyles();

    return (
      <MenuItemUI
        ref={ref}
        className={classes.menuItem}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </MenuItemUI>
    );
  },
);

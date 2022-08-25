import { IconButton, Menu as MenuUI } from '@material-ui/core';
import {
  Children,
  isValidElement,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import { uid } from 'react-uid';

import { KebabIcon } from 'uiKit/Icons/KebabIcon';

import { MenuItem } from './MenuItem';
import { useMenuStyles } from './useMenuStyles';

export interface IMenuProps {
  children: ReactNode;
}

const VERTICAL_MARGIN = -56;

export const Menu = ({ children }: IMenuProps): JSX.Element => {
  const classes = useMenuStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const size = Children.count(children);

  const handleOpenMenu = useCallback(
    event => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  return (
    <>
      <IconButton
        className={classes.menuIcon}
        data-testid="menu-button"
        id="menu-button"
        onClick={handleOpenMenu}
      >
        <KebabIcon htmlColor="inherit" />
      </IconButton>

      <MenuUI
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={{
          paper: classes.menuPaper,
          list: classes.menuList,
        }}
        id="asset-menu"
        marginThreshold={16}
        open={isOpen}
        transformOrigin={{
          vertical: VERTICAL_MARGIN,
          horizontal: 'right',
        }}
        onClose={handleClose}
      >
        {Children.map(
          children,
          (child, index) =>
            isValidElement(child) && (
              <div key={uid(index)}>
                {child}

                {index !== size - 1 && <div className={classes.divider} />}
              </div>
            ),
        )}
      </MenuUI>
    </>
  );
};

Menu.Item = MenuItem;

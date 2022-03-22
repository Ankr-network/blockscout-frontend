import { IconButton, Menu as MenuUI } from '@material-ui/core';
import { Children, ReactNode, useCallback, useState } from 'react';
import { uid } from 'react-uid';

import { KebabIcon } from 'uiKit/Icons/KebabIcon';

import { MenuItem } from './MenuItem';
import { useMenuStyles } from './useMenuStyles';

export interface IMenuProps {
  children: ReactNode[];
}

const VERTICAL_MARGIN = -56;

export const Menu = ({ children }: IMenuProps): JSX.Element => {
  const classes = useMenuStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const size = Children.count(children.filter(Boolean));

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
    <div>
      <IconButton
        className={classes.menuIcon}
        data-testid="menu-button"
        id="menu-button"
        onClick={handleOpenMenu}
      >
        <KebabIcon />
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
            Boolean(child) && (
              <div key={uid(index)}>
                {child}

                {index !== size - 1 && <div className={classes.divider} />}
              </div>
            ),
        )}
      </MenuUI>
    </div>
  );
};

Menu.Item = MenuItem;

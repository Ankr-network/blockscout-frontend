import { Menu, MenuItem, MenuItemProps, PopoverOrigin } from '@mui/material';

import { useAddWhitelistMenuStyles } from './useAddWhitelistMenuStyles';

export interface AddWhitelistMenuProps {
  anchorEl: HTMLButtonElement | null;
  isOpened: boolean;
  items: MenuItemProps[];
  location?: PopoverOrigin['vertical'];
  onClose: () => void;
}

export const AddWhitelistMenu = ({
  anchorEl,
  isOpened,
  items,
  location = 'bottom',
  onClose,
}: AddWhitelistMenuProps) => {
  const hasBottomLocation = location === 'bottom';

  const { classes } = useAddWhitelistMenuStyles(hasBottomLocation);

  return (
    <Menu
      MenuListProps={{
        'aria-labelledby': 'long-button',
      }}
      PaperProps={{
        className: classes.paper,
      }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: location,
        horizontal: 'right',
      }}
      onClose={onClose}
      open={isOpened}
      transformOrigin={{
        vertical: hasBottomLocation ? 'top' : 'bottom',
        horizontal: 'right',
      }}
    >
      {items.map(item => (
        <MenuItem {...item} key={JSON.stringify(item)} />
      ))}
    </Menu>
  );
};

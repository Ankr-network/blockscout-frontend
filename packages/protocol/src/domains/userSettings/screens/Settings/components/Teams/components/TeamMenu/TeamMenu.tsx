import { Fade, Menu, MenuProps, Tooltip } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { Delete, Rename } from '@ankr.com/ui';
import { t, tHTML } from '@ankr.com/common';

import { useTeamMenuStyles } from './useTeamMenuStyles';

export type TeamMenuProps = Pick<MenuProps, 'anchorEl' | 'open'> & {
  onClose: () => void;
  onOpenRenameModal: () => void;
};

export const TeamMenu = ({
  onClose,
  open,
  anchorEl,
  onOpenRenameModal,
}: TeamMenuProps) => {
  const { classes } = useTeamMenuStyles();

  return (
    <Menu
      TransitionComponent={Fade}
      anchorOrigin={{
        vertical: 40,
        horizontal: 'right',
      }}
      disableScrollLock
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      onClose={onClose}
      open={open}
      anchorEl={anchorEl}
    >
      <MenuItem onClick={onOpenRenameModal}>
        <Rename className={classes.menuIcon} />
        {t('teams.teams-list.menu.rename')}
      </MenuItem>

      <Tooltip title={tHTML('teams.teams-list.menu.delete-tip')}>
        <MenuItem className={classes.deleteMenuItem}>
          <Delete className={classes.menuIcon} />
          {t('teams.teams-list.menu.delete')}
        </MenuItem>
      </Tooltip>
    </Menu>
  );
};

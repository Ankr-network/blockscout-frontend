import { Edit, Delete } from '@ankr.com/ui';
import { Button, MenuItem } from '@mui/material';
import { useCallback } from 'react';
import { t } from '@ankr.com/common';

import { useMenu } from 'modules/common/hooks/useMenu';
import { MenuButton } from 'modules/common/components/MenuButton';

import { useProjectDetailsMenuStyles } from './useProjectDetailsMenuStyles';

interface ProjectDetailsMenuProps {
  openProjectInfoDialog: () => void;
  openProjectDeleteDialog: () => void;
  isDeleteProjectDisabled: boolean;
}

export const ProjectDetailsMenu = ({
  isDeleteProjectDisabled,
  openProjectDeleteDialog,
  openProjectInfoDialog,
}: ProjectDetailsMenuProps) => {
  const { anchorEl, handleClose, handleOpen, open } = useMenu();

  const { classes, cx } = useProjectDetailsMenuStyles();

  const openInfoDialog = useCallback(() => {
    handleClose();
    openProjectInfoDialog();
  }, [handleClose, openProjectInfoDialog]);

  const openDeleteDialog = useCallback(() => {
    handleClose();
    openProjectDeleteDialog();
  }, [handleClose, openProjectDeleteDialog]);

  return (
    <MenuButton
      anchorEl={anchorEl}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      buttonProps={{
        className: cx(classes.btnMore, {
          [classes.isActive]: open,
        }),
      }}
    >
      <MenuItem
        component={Button}
        onClick={openInfoDialog}
        startIcon={<Edit className={classes.icon} />}
        variant="text"
        fullWidth
      >
        {t('project.header.header-menu-edit-button')}
      </MenuItem>

      <MenuItem
        component={Button}
        onClick={openDeleteDialog}
        startIcon={<Delete className={classes.icon} />}
        variant="text"
        fullWidth
        disabled={isDeleteProjectDisabled}
      >
        {t('project.header.header-menu-delete-button')}
      </MenuItem>
    </MenuButton>
  );
};

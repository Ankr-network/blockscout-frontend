import { Delete, Edit } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { useCallback } from 'react';

import { MenuButton, MenuItem } from 'modules/common/components/MenuButton';
import { DeleteProjectDialog } from 'domains/jwtToken/components/DeleteProjectDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useMenu } from 'modules/common/hooks/useMenu';

interface ActionsMenuProps {
  isPrimary: boolean;
  tokenIndex: number;
}

export const ActionsMenu = ({ isPrimary, tokenIndex }: ActionsMenuProps) => {
  const { anchorEl, handleOpen, handleClose, open } = useMenu();

  const {
    isOpened: isDeleteProjectDialogOpened,
    onOpen: onOpenDeleteProjectDialog,
    onClose: onCloseDeleteProjectDialog,
  } = useDialog();

  const handleOpenDeleteDialog = useCallback(() => {
    onOpenDeleteProjectDialog();
    handleClose();
  }, [handleClose, onOpenDeleteProjectDialog]);

  return (
    <>
      <MenuButton
        anchorEl={anchorEl}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
      >
        <MenuItem disabled startIcon={<Edit />}>
          {t('projects.list-project.edit')}
        </MenuItem>

        <MenuItem
          disabled={isPrimary}
          startIcon={<Delete />}
          onClick={handleOpenDeleteDialog}
        >
          {t('projects.new-project.step-2.delete')}
        </MenuItem>
      </MenuButton>

      <DeleteProjectDialog
        open={isDeleteProjectDialogOpened}
        tokenIndex={tokenIndex}
        onClose={onCloseDeleteProjectDialog}
      />
    </>
  );
};

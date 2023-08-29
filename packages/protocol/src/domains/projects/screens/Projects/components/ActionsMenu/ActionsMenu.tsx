import { Delete, Edit, Freeze, Unfreeze } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { useCallback } from 'react';
import { useForm } from 'react-final-form';

import { MenuButton, MenuItem } from 'modules/common/components/MenuButton';
import { DeleteProjectDialog } from 'domains/jwtToken/components/DeleteProjectDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useMenu } from 'modules/common/hooks/useMenu';
import { FreezeAndUnfreezeProjectDialog } from 'domains/jwtToken/components/FreezeAndUnfreezeProjectDialog';
import { Project } from 'domains/projects/utils/getAllProjects';
import { PRIMARY_TOKEN_INDEX } from 'domains/jwtToken/utils/utils';

import { AddAndEditProjectDialogFields } from '../AddAndEditProjectForm/AddAndEditProjectFormUtils';

interface ActionsMenuProps {
  rowData: Project;
  onProjectDialogOpen: () => void;
}

export const ActionsMenu = ({
  rowData,
  onProjectDialogOpen,
}: ActionsMenuProps) => {
  const {
    tokenIndex,
    isFrozen: frozen,
    userEndpointToken,
    name,
    description,
  } = rowData;
  const isPrimary = tokenIndex === PRIMARY_TOKEN_INDEX;
  const { anchorEl, handleOpen, handleClose, open } = useMenu();

  const {
    isOpened: isDeleteProjectDialogOpened,
    onOpen: onOpenDeleteProjectDialog,
    onClose: onCloseDeleteProjectDialog,
  } = useDialog();
  const { change } = useForm();

  const handleEditByClick = useCallback(() => {
    change(AddAndEditProjectDialogFields.name, name);
    change(AddAndEditProjectDialogFields.description, description);
    change(AddAndEditProjectDialogFields.isEditingProjectDialog, true);
    change(AddAndEditProjectDialogFields.tokenIndex, tokenIndex);

    onProjectDialogOpen();
    handleClose();
  }, [name, description, tokenIndex, change, onProjectDialogOpen, handleClose]);

  const {
    isOpened: isFreezeAndUnfreezeProjectDialogOpened,
    onOpen: onOpenFreezeAndUnfreezeProjectDialog,
    onClose: onCloseFreezeAndUnfreezeProjectDialog,
  } = useDialog();

  const handleOpenFreezeDialog = useCallback(() => {
    onOpenFreezeAndUnfreezeProjectDialog();
    handleClose();
  }, [handleClose, onOpenFreezeAndUnfreezeProjectDialog]);

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
        <MenuItem
          startIcon={frozen ? <Unfreeze /> : <Freeze />}
          onClick={handleOpenFreezeDialog}
        >
          {frozen
            ? t('projects.list-project.unfreeze')
            : t('projects.list-project.freeze')}
        </MenuItem>

        <MenuItem
          disabled={isPrimary}
          startIcon={<Edit />}
          onClick={handleEditByClick}
        >
          {t('projects.list-project.edit')}
        </MenuItem>

        <MenuItem
          disabled={isPrimary}
          startIcon={<Delete />}
          onClick={handleOpenDeleteDialog}
        >
          {t('projects.list-project.delete')}
        </MenuItem>
      </MenuButton>

      <DeleteProjectDialog
        open={isDeleteProjectDialogOpened}
        tokenIndex={tokenIndex}
        onClose={onCloseDeleteProjectDialog}
      />

      <FreezeAndUnfreezeProjectDialog
        isFreeze={!frozen}
        open={isFreezeAndUnfreezeProjectDialogOpened}
        userEndpointToken={userEndpointToken}
        projectName={name}
        onClose={onCloseFreezeAndUnfreezeProjectDialog}
      />
    </>
  );
};

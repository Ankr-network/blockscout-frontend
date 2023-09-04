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
import { useAppSelector } from 'store/useAppSelector';
import { selectDraftTokenIndex } from 'domains/projects/store';

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

  const draftTokenIndex = useAppSelector(selectDraftTokenIndex);

  const {
    isOpened: isDeleteProjectDialogOpened,
    onOpen: onOpenDeleteProjectDialog,
    onClose: onCloseDeleteProjectDialog,
  } = useDialog();
  const { initialize } = useForm();

  const handleEditByClick = useCallback(() => {
    initialize({
      [AddAndEditProjectDialogFields.name]: name,
      [AddAndEditProjectDialogFields.description]: description,
      [AddAndEditProjectDialogFields.isEditingProjectDialog]: true,
      [AddAndEditProjectDialogFields.tokenIndex]: tokenIndex,
    });

    onProjectDialogOpen();
    handleClose();
  }, [
    initialize,
    name,
    description,
    tokenIndex,
    onProjectDialogOpen,
    handleClose,
  ]);

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
          disabled={tokenIndex === draftTokenIndex}
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

import { Delete, Rename, Freeze, Unfreeze } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { MouseEvent, useCallback } from 'react';
import { useForm } from 'react-final-form';

import { MenuButton, MenuItem } from 'modules/common/components/MenuButton';
import { DeleteProjectDialog } from 'domains/jwtToken/components/DeleteProjectDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useMenu } from 'modules/common/hooks/useMenu';
import { FreezeAndUnfreezeProjectDialog } from 'domains/jwtToken/components/FreezeAndUnfreezeProjectDialog';
import { ProjectTable } from 'domains/projects/utils/getAllProjects';
import { PRIMARY_TOKEN_INDEX } from 'domains/jwtToken/utils/utils';
import { selectDraftUserEndpointToken } from 'domains/projects/store';
import { useAppSelector } from 'store/useAppSelector';
import { selectIsInactiveStatus } from 'domains/auth/store';

import { EditProjectDialogFields } from '../EditProjectDialog/EditProjectDialogUtils';

interface ActionsMenuProps {
  rowData: ProjectTable;
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
    projectStatus,
  } = rowData;
  const isPrimary = tokenIndex === PRIMARY_TOKEN_INDEX;
  const { anchorEl, handleOpen, handleClose, open } = useMenu();

  const draftUserEndpointToken = useAppSelector(selectDraftUserEndpointToken);

  const {
    isOpened: isDeleteProjectDialogOpened,
    onOpen: onOpenDeleteProjectDialog,
    onClose: onCloseDeleteProjectDialog,
  } = useDialog();
  const { initialize } = useForm();

  const handleEditByClick = useCallback(() => {
    initialize({
      [EditProjectDialogFields.name]: name,
      [EditProjectDialogFields.tokenIndex]: tokenIndex,
    });

    onProjectDialogOpen();
    handleClose();
  }, [initialize, name, tokenIndex, onProjectDialogOpen, handleClose]);

  const {
    isOpened: isFreezeAndUnfreezeProjectDialogOpened,
    onOpen: onOpenFreezeAndUnfreezeProjectDialog,
    onClose: onCloseFreezeAndUnfreezeProjectDialog,
  } = useDialog();

  const handleCloseDeleteProjectDialog = (
    event?: MouseEvent<HTMLButtonElement>,
  ) => {
    event?.stopPropagation();
    onCloseDeleteProjectDialog();
  };

  const handleCloseFreezeAndUnfreezeProjectDialog = (
    event?: MouseEvent<HTMLButtonElement>,
  ) => {
    event?.stopPropagation();
    onCloseFreezeAndUnfreezeProjectDialog();
  };

  const handleOpenFreezeDialog = useCallback(() => {
    onOpenFreezeAndUnfreezeProjectDialog();
    handleClose();
  }, [handleClose, onOpenFreezeAndUnfreezeProjectDialog]);

  const handleOpenDeleteDialog = useCallback(() => {
    onOpenDeleteProjectDialog();
    handleClose();
  }, [handleClose, onOpenDeleteProjectDialog]);

  const isUserAccountInactive = useAppSelector(selectIsInactiveStatus);

  const isFreezeProjectButtonDisabled =
    userEndpointToken === draftUserEndpointToken ||
    projectStatus.suspended ||
    isUserAccountInactive;

  return (
    <>
      <MenuButton
        anchorEl={anchorEl}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        // we need to disable propagation to prevent routing on disabled menu item
        // @ts-ignore
        onClick={e => e.stopPropagation()}
      >
        <MenuItem
          disabled={isPrimary}
          startIcon={<Rename />}
          onClick={handleEditByClick}
        >
          {t('projects.list-project.rename')}
        </MenuItem>

        <MenuItem
          disabled={isFreezeProjectButtonDisabled}
          startIcon={frozen ? <Unfreeze /> : <Freeze />}
          onClick={handleOpenFreezeDialog}
        >
          {frozen
            ? t('projects.list-project.unfreeze')
            : t('projects.list-project.freeze')}
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
        onClose={handleCloseDeleteProjectDialog}
      />

      <FreezeAndUnfreezeProjectDialog
        isFreeze={!frozen}
        open={isFreezeAndUnfreezeProjectDialogOpened}
        userEndpointToken={userEndpointToken}
        projectName={name}
        onClose={handleCloseFreezeAndUnfreezeProjectDialog}
      />
    </>
  );
};

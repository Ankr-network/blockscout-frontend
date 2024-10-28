import { Delete, Rename, Freeze, Unfreeze } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-final-form';

import { DeleteProjectDialog } from 'domains/jwtToken/components/DeleteProjectDialog';
import { FreezeAndUnfreezeProjectDialog } from 'domains/jwtToken/components/FreezeAndUnfreezeProjectDialog';
import { MenuButton, MenuItem } from 'modules/common/components/MenuButton';
import { PRIMARY_TOKEN_INDEX } from 'domains/jwtToken/utils/utils';
import { selectDraftUserEndpointToken } from 'domains/projects/store';
import { selectIsInactiveStatus } from 'domains/auth/store';
import { useAppSelector } from 'store/useAppSelector';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useJWTStatus } from 'domains/jwtToken/hooks/useJWTStatus';
import { useJWTs } from 'domains/jwtToken/hooks/useJWTs';
import { useMenu } from 'modules/common/hooks/useMenu';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { EditProjectDialogFields } from '../EditProjectDialog/EditProjectDialogUtils';

interface ActionsMenuProps {
  onProjectDialogOpen: () => void;
  userEndpointToken: string;
}

export const ActionsMenu = ({
  onProjectDialogOpen,
  userEndpointToken,
}: ActionsMenuProps) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { jwts: projects } = useJWTs({ group, skipFetching: true });
  const { jwtStatus: projectStatus } = useJWTStatus({
    group,
    userEndpointToken,
  });

  const project = useMemo(
    () => projects.find(jwt => jwt.userEndpointToken === userEndpointToken),
    [projects, userEndpointToken],
  );

  const { index, name } = project!;
  const { frozen } = projectStatus;
  const isPrimary = index === PRIMARY_TOKEN_INDEX;

  const { anchorEl, handleClose, handleOpen, open } = useMenu();

  const draftUserEndpointToken = useAppSelector(selectDraftUserEndpointToken);

  const {
    isOpened: isDeleteProjectDialogOpened,
    onClose: handleCloseDeleteProjectDialog,
    onOpen: onOpenDeleteProjectDialog,
  } = useDialog();
  const { initialize } = useForm();

  const handleEditByClick = useCallback(() => {
    initialize({
      [EditProjectDialogFields.name]: name,
      [EditProjectDialogFields.tokenIndex]: index,
    });

    onProjectDialogOpen();
    handleClose();
  }, [initialize, name, index, onProjectDialogOpen, handleClose]);

  const {
    isOpened: isFreezeAndUnfreezeProjectDialogOpened,
    onClose: handleCloseFreezeAndUnfreezeProjectDialog,
    onOpen: onOpenFreezeAndUnfreezeProjectDialog,
  } = useDialog();

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
        <MenuItem startIcon={<Rename />} onClick={handleEditByClick}>
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
        tokenIndex={index}
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

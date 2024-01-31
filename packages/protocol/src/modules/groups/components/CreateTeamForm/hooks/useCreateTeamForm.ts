import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';

import { useDialog } from 'modules/common/hooks/useDialog';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { ESettingsContentType } from 'domains/userSettings/types';
import {
  useTeamNameInput,
  UseTeamNameInputParams,
} from 'modules/groups/components/TeamNameInput/hooks/useTeamNameInput';
import { useDataTransferSwitcher } from 'modules/groups/components/DataTransferSection';
import { useConfirmDataTransferDialog } from 'modules/groups/components/ConfirmDataTransferDialog';
import { getGroupMembersEmails } from 'domains/userSettings/screens/Settings/utils/getGroupMembersEmails';

import { useCreateTeamFlow } from './useCreateTeamFlow';

export interface CreateTeamFormProps extends UseTeamNameInputParams {}

export const useCreateTeamForm = ({ teamName }: CreateTeamFormProps) => {
  const { teamNameValue, handleChange } = useTeamNameInput({ teamName });

  const { onDataTransferSwitchChange, isDataTransferEnabled } =
    useDataTransferSwitcher();

  const {
    isOpened: isOpenedSuccessDialog,
    onClose: onCloseSuccessDialog,
    onOpen: onOpenSuccessDialog,
  } = useDialog();

  const { push } = useHistory();

  const handleCloseSuccessDialog = useCallback(() => {
    onCloseSuccessDialog();
    push(
      UserSettingsRoutesConfig.settings.generatePath(
        ESettingsContentType.Teams,
      ),
    );
  }, [onCloseSuccessDialog, push]);

  const {
    isOpened: isOpenedDataTransferDialog,
    onClose: onCloseDataTransferDialog,
    onOpen: onOpenDataTransferDialog,
  } = useDialog();

  const {
    isOpened: isOpenedInviteTeammatesDialog,
    onClose: onCloseInviteTeammatesDialog,
    onOpen: onOpenInviteTeammatesDialog,
  } = useDialog();

  const {
    createdGroupDetails,
    handleCreateTeamFlow,
    handleCreateTeamRequest,
    isCreateTeamLoading,
  } = useCreateTeamFlow({
    onOpenDataTransferDialog,
    teamNameValue,
    isDataTransferEnabled,
  });

  const invitedEmails = useMemo(
    () => getGroupMembersEmails({ groupDetails: createdGroupDetails }),
    [createdGroupDetails],
  );

  const {
    confirmInputValue,
    setConfirmInputValue,
    onChangeConfirmInputValue,
    handleConfirmDataTransfer,
    confirmInputError,
    setConfirmInputError,
  } = useConfirmDataTransferDialog({
    handleCreateTeamRequest,
    onCloseDataTransferDialog,
  });

  const handleCloseDataTransferDialog = useCallback(() => {
    setConfirmInputValue('');
    setConfirmInputError(undefined);
    onCloseDataTransferDialog();
  }, [onCloseDataTransferDialog, setConfirmInputError, setConfirmInputValue]);

  const handleOpenInviteTeammatesDialog = useCallback(() => {
    handleCloseSuccessDialog();
    onOpenInviteTeammatesDialog();
  }, [handleCloseSuccessDialog, onOpenInviteTeammatesDialog]);

  const handleCloseInviteTeamDialog = useCallback(() => {
    onCloseInviteTeammatesDialog();
  }, [onCloseInviteTeammatesDialog]);

  return {
    confirmInputError,
    confirmInputValue,
    handleChange,
    handleCloseInviteTeamDialog,
    handleConfirmDataTransfer,
    handleCreateTeamFlow,
    handleOpenInviteTeammatesDialog,
    invitedEmails,
    isCreateTeamLoading,
    isDataTransferEnabled,
    isOpenedDataTransferDialog,
    isOpenedInviteTeammatesDialog,
    isOpenedSuccessDialog,
    onChangeConfirmInputValue,
    onCloseDataTransferDialog: handleCloseDataTransferDialog,
    onCloseSuccessDialog: handleCloseSuccessDialog,
    onDataTransferSwitchChange,
    onOpenSuccessDialog,
    teamNameValue,
  };
};

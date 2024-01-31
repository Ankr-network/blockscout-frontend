import { ConfirmDataTransferDialog } from 'modules/groups/components/ConfirmDataTransferDialog';

import { CreateTeamFormContent } from './CreateTeamFormContent';
import {
  CreateTeamFormProps,
  useCreateTeamForm,
} from './hooks/useCreateTeamForm';

export const CreateTeamForm = ({ teamName }: CreateTeamFormProps) => {
  const {
    teamNameValue,
    handleChange,
    isDataTransferEnabled,
    onDataTransferSwitchChange,
    handleCreateTeamFlow,
    isCreateTeamLoading,
    isOpenedDataTransferDialog,
    onCloseDataTransferDialog,
    handleConfirmDataTransfer,
    confirmInputValue,
    onChangeConfirmInputValue,
    confirmInputError,
  } = useCreateTeamForm({ teamName });

  return (
    <>
      <CreateTeamFormContent
        teamNameValue={teamNameValue}
        handleChange={handleChange}
        isDataTransferEnabled={isDataTransferEnabled}
        onDataTransferSwitchChange={onDataTransferSwitchChange}
        handleCreateTeamFlow={handleCreateTeamFlow}
        isCreateTeamLoading={isCreateTeamLoading}
      />
      <ConfirmDataTransferDialog
        isOpened={isOpenedDataTransferDialog}
        onClose={onCloseDataTransferDialog}
        onConfirmButtonClick={handleConfirmDataTransfer}
        confirmInputValue={confirmInputValue}
        onChangeConfirmInputValue={onChangeConfirmInputValue}
        confirmInputError={confirmInputError}
        isLoading={isCreateTeamLoading}
      />
    </>
  );
};

import { t } from '@ankr.com/common';
import { ChangeEvent, useCallback, useState } from 'react';

export const CONFIRM_PHRASE = 'transfer all assets';

interface UseConfirmDataTransferDialogParams {
  handleCreateTeamRequest: () => Promise<void>;
  onCloseDataTransferDialog: () => void;
}

export const useConfirmDataTransferDialog = ({
  handleCreateTeamRequest,
  onCloseDataTransferDialog,
}: UseConfirmDataTransferDialogParams) => {
  const [confirmInputValue, setConfirmInputValue] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const onChangeConfirmInputValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setConfirmInputValue(event.target.value);
      setError(undefined);
    },
    [],
  );

  const handleConfirmDataTransfer = useCallback(async () => {
    const isValid = confirmInputValue === CONFIRM_PHRASE;

    if (isValid) {
      await handleCreateTeamRequest();
      onCloseDataTransferDialog();
    } else {
      setError(t('teams.create-team-confirm-data-dialog.error-text'));
    }
  }, [confirmInputValue, handleCreateTeamRequest, onCloseDataTransferDialog]);

  return {
    confirmInputValue,
    setConfirmInputValue,
    onChangeConfirmInputValue,
    handleConfirmDataTransfer,
    confirmInputError: error,
    setConfirmInputError: setError,
  };
};

import { Button } from '@mui/material';
import { t } from '@ankr.com/common';
import { IGroupMember } from 'multirpc-sdk';

import { Dialog } from 'uiKit/Dialog';
import { LoadingButton } from 'uiKit/LoadingButton';

import { useTransferOwnershipDialog } from './useTransferOwnershipDialog';
import { SelectUserStep } from './SelectUserStep';
import { ConfirmStep } from './ConfirmStep';
import { useTransferOwnershipDialogStyles } from './useTransferOwnershipDialogStyles';

interface ITransferOwnershipDialogProps {
  members: IGroupMember[];
  group: string;
  open: boolean;
  onClose: () => void;
}

export const TransferOwnershipDialog = ({
  members,
  group,
  open,
  onClose,
}: ITransferOwnershipDialogProps) => {
  const { classes } = useTransferOwnershipDialogStyles();

  const {
    isSelectStep,
    title,
    submitButtonTitle,
    isLoading,
    selectedUser,
    userOptions,
    userName,
    ownerInputError,
    confirmInputValue,
    confirmInputError,
    handleSubmit,
    handleSelectUser,
    onChangeConfirmInputValue,
    handleCloseTransferOwnershipDialog,
  } = useTransferOwnershipDialog({
    members,
    group,
    onClose,
  });

  return (
    <Dialog
      maxPxWidth={600}
      onClose={handleCloseTransferOwnershipDialog}
      open={open}
      title={title}
    >
      <div className={classes.content}>
        {isSelectStep ? (
          <SelectUserStep
            selectedUser={selectedUser}
            userOptions={userOptions}
            handleSelectUser={handleSelectUser}
            ownerInputError={ownerInputError}
          />
        ) : (
          <ConfirmStep
            selectedUserEmail={selectedUser?.email}
            userName={userName}
            inputValue={confirmInputValue}
            inputError={confirmInputError}
            onChangeInputValue={onChangeConfirmInputValue}
          />
        )}
      </div>

      <LoadingButton
        fullWidth
        className={classes.submit}
        loading={isLoading}
        onClick={handleSubmit}
      >
        {submitButtonTitle}
      </LoadingButton>
      <Button
        fullWidth
        variant="outlined"
        onClick={handleCloseTransferOwnershipDialog}
      >
        {t('teams.transfer-ownership.cancel')}
      </Button>
    </Dialog>
  );
};

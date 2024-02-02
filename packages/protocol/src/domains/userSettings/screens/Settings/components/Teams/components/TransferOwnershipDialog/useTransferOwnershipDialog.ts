import { t } from '@ankr.com/common';
import { SelectChangeEvent } from '@mui/material';
import { GroupUserRole, IGroupMember } from 'multirpc-sdk';
import { ChangeEvent, useCallback, useState } from 'react';

import { useUpdateRoleMutation } from 'domains/userSettings/actions/teams/updateRole';

enum TransferOwnershipStep {
  Select,
  Confirm,
}

interface IUseTransferOwnershipDialogParams {
  group: string;
  members: IGroupMember[];
  onClose: () => void;
}

export interface IUseTransferOwnershipDialogResult {
  isSelectStep: boolean;
  title: string;
  submitButtonTitle: string;
  selectedUser?: IGroupMember;
  isLoading: boolean;
  userOptions: IGroupMember[];
  userName?: string;
  confirmInputValue: string;
  confirmInputError?: string;
  onChangeConfirmInputValue: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSelectUser: (event: SelectChangeEvent<string>) => void;
  handleSubmit: () => void;
  handleCloseTransferOwnershipDialog: () => void;
}

export const useTransferOwnershipDialog = ({
  group,
  members,
  onClose,
}: IUseTransferOwnershipDialogParams): IUseTransferOwnershipDialogResult => {
  const defaultStep = TransferOwnershipStep.Select;
  const [step, setStep] = useState(defaultStep);
  const [user, setUser] = useState<IGroupMember | undefined>();
  const [confirmInputValue, setConfirmInputValue] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const userName = user?.email?.split('@')[0] || user?.address.slice(0, 6);
  const checkText = t('teams.transfer-ownership.confirm-step.check-text', {
    userName,
  });

  const [updateRole, { isLoading }] = useUpdateRoleMutation();

  const isSelectStep = step === TransferOwnershipStep.Select;

  const clearTransferOwnershipDialogState = useCallback(() => {
    setConfirmInputValue('');
    setUser(undefined);
    setError(undefined);
    setStep(defaultStep);
  }, [defaultStep]);

  const handleCloseTransferOwnershipDialog = useCallback(() => {
    onClose();
    clearTransferOwnershipDialogState();
  }, [onClose, clearTransferOwnershipDialogState]);

  const handleSubmit = useCallback(async () => {
    if (isSelectStep) {
      setStep(TransferOwnershipStep.Confirm);
    } else if (user?.address) {
      const isValid = confirmInputValue === checkText;

      if (isValid) {
        await updateRole({
          role: GroupUserRole.owner,
          userAddress: user?.address,
          email: user?.email,
          group,
        });
        handleCloseTransferOwnershipDialog();
      } else {
        setError(t('teams.transfer-ownership.confirm-step.error-text'));
      }
    }
  }, [
    group,
    isSelectStep,
    handleCloseTransferOwnershipDialog,
    confirmInputValue,
    checkText,
    updateRole,
    user?.address,
    user?.email,
  ]);

  const onChangeConfirmInputValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setConfirmInputValue(event.target.value);
      setError(undefined);
    },
    [],
  );

  const handleSelectUser = useCallback(
    (event: SelectChangeEvent<string>) => {
      const { value } = event.target;
      const foundUser = members.find(
        x => x.email === value || x.address.startsWith(value),
      );

      setUser(foundUser);
    },
    [members],
  );

  return {
    isSelectStep,
    title: isSelectStep
      ? t('teams.transfer-ownership.select-step.title')
      : t('teams.transfer-ownership.confirm-step.title'),
    submitButtonTitle: isSelectStep
      ? t('teams.transfer-ownership.select-step.submit')
      : t('teams.transfer-ownership.confirm-step.submit'),
    isLoading,
    selectedUser: user,
    userOptions: members.filter(member => member.role !== GroupUserRole.owner),
    userName,
    confirmInputValue,
    confirmInputError: error,
    handleSelectUser,
    handleSubmit,
    onChangeConfirmInputValue,
    handleCloseTransferOwnershipDialog,
  };
};

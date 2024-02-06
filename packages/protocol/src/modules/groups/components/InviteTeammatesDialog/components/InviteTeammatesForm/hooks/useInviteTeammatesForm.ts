import { Web3Address } from 'multirpc-sdk';

import { useEmailsInput } from '../../EmailsInput';
import { useEmailsInputErrorMessage } from './useEmailsInputErrorMessage';
import { useInviteCallback } from './useInviteCallback';
import { useInviteeRoleSelector } from '../../InviteeRoleSelector';
import { useSuccessCallback } from './useSuccessCallback';
import { useChangeEmailsInputCallback } from './useChangeEmailsInputCallback';
import { useErrorCallback } from './useErrorCallback';

export interface UseInviteTeammatesFormParams {
  group: Web3Address;
  handleCloseDialog?: () => void;
  invitedEmails: string[];
  teamMembersCount: number;
  teamMembersLimit: number;
}

export const useInviteTeammatesForm = ({
  group,
  handleCloseDialog,
  invitedEmails,
  teamMembersCount,
  teamMembersLimit,
}: UseInviteTeammatesFormParams) => {
  const { errorMessage, resetErrorMessage, setErrorMessage } =
    useEmailsInputErrorMessage();

  const onChange = useChangeEmailsInputCallback({
    resetErrorMessage,
    setErrorMessage,
    teamMembersCount,
    teamMembersLimit,
  });

  const {
    emails,
    onChange: onEmailsInputChange,
    value,
  } = useEmailsInput({ invitedEmails, onChange });

  const { value: inviteeRole, onChange: onInviteeRoleChange } =
    useInviteeRoleSelector();

  const { onSuccess } = useSuccessCallback({ handleCloseDialog });
  const { onError } = useErrorCallback({ handleCloseDialog });

  const { handleInvite, isInviting } = useInviteCallback({
    emails,
    group,
    inviteeRole,
    onError,
    onSuccess,
    setErrorMessage,
  });

  return {
    errorMessage,
    handleInvite,
    inviteeRole,
    isInviting,
    onEmailsInputChange,
    onInviteeRoleChange,
    value,
  };
};

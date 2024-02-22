import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';

import {
  TeamInvitationDialog,
  useTeamInvitationDialog,
} from '../TeamInvitationDialog';
import { useTeamInvitationFormProps } from './hooks/useTeamInvitationFormProps';
import { useTeamInvitationSignInDialog } from '../../hooks/useSignUpDialog';

export interface TeamInvitationDialogContainerProps {
  isOpened: boolean;
}

export const TeamInvititationDialogContainer = ({
  isOpened: open,
}: TeamInvitationDialogContainerProps) => {
  const {
    handleTeamInvitationDialogClose,
    handleTeamInvitationDialogHide,
    handleTeamInvitationDialogOpen,
    handleTeamInvitationDialogShow,
    teamInvitationDialogProps,
  } = useTeamInvitationDialog({ open });

  const {
    handleSignInDialogClose,
    handleSignInDialogOpen,
    isSignInDialogOpened,
    title,
  } = useTeamInvitationSignInDialog({
    onClose: handleTeamInvitationDialogOpen,
    onOpen: handleTeamInvitationDialogClose,
  });

  const { teamInvitationFormProps: formProps } = useTeamInvitationFormProps({
    handleSignInDialogOpen,
    handleTeamInvitationDialogClose,
    handleTeamInvitationDialogHide,
    handleTeamInvitationDialogShow,
  });

  return (
    <>
      <TeamInvitationDialog
        {...teamInvitationDialogProps}
        formProps={formProps}
      />
      <SignupDialog
        hasAutoAgreement
        hasOnlyGoogleAuth
        shouldResetAuthDataForGoogleAuth
        isOpen={isSignInDialogOpened}
        onClose={handleSignInDialogClose}
        shouldSaveTeamInvitationLink={false}
        title={title}
      />
    </>
  );
};

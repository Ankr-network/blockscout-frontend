import { UseDeclineTeamInvitationDialogParams } from 'domains/userSettings/screens/TeamInvitation/components/DeclineTeamInvitationDialog';

interface CommonTeamInvitationFormProps {
  isJoining: boolean;
  onJoin: () => void;
  teamName: string;
}

export interface TeamInvitationFormWithDeclineButtonProps
  extends CommonTeamInvitationFormProps,
    Omit<UseDeclineTeamInvitationDialogParams, 'open' | 'onOpen'> {
  onDeclineDialogClose: () => void;
  onDeclineDialogOpen: () => void;
}

export interface TeamInvitationFormWithSignInButtonProps
  extends CommonTeamInvitationFormProps {
  onSignInWithAnotherEmail: () => void;
}

export type TeamInvitationFormProps =
  | TeamInvitationFormWithDeclineButtonProps
  | TeamInvitationFormWithSignInButtonProps;

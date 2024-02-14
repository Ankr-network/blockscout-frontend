import { GroupUserRole } from 'multirpc-sdk';

import { UseDeclineTeamInvitationDialogParams } from 'domains/userSettings/screens/TeamInvitation/components/DeclineTeamInvitationDialog';

type DeclineDialogProps = Omit<
  UseDeclineTeamInvitationDialogParams,
  'open' | 'onOpen' | 'role'
>;

export interface TeamInvitationFormProps extends DeclineDialogProps {
  isJoining: boolean;
  onJoin: () => void;
  role: GroupUserRole;
  teamName: string;
  onDeclineDialogClose: () => void;
  onDeclineDialogOpen: () => void;
  onSignInWithAnotherEmail: () => void;
}

import {
  TeamInvitationDialog,
  useTeamInvitationDialog,
} from '../TeamInvitationDialog';
import { useTeamInvitationFormProps } from './hooks/useTeamInvitationFormProps';

export interface TeamInvitationDialogContainerProps {
  isOpened: boolean;
}

export const TeamInvititationDialogContainer = ({
  isOpened: open,
}: TeamInvitationDialogContainerProps) => {
  const {
    handleTeamInvitationDialogClose,
    handleTeamInvitationDialogHide,
    handleTeamInvitationDialogShow,
    teamInvitationDialogProps,
  } = useTeamInvitationDialog({ open });

  const { teamInvitationFormProps: formProps } = useTeamInvitationFormProps({
    handleTeamInvitationDialogClose,
    handleTeamInvitationDialogHide,
    handleTeamInvitationDialogShow,
  });

  return (
    <TeamInvitationDialog
      {...teamInvitationDialogProps}
      formProps={formProps}
    />
  );
};

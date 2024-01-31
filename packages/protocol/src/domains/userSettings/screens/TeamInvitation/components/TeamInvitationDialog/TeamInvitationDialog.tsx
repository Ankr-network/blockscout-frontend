import { Dialog, IDialogProps } from 'uiKit/Dialog';

import { Header } from './components/Header';
import {
  TeamInvitationForm,
  TeamInvitationFormProps,
} from './components/TeamInvitationForm';
import { useTeamInvitationDialogStyles } from './useTeamInvitationDialogStyles';

export interface TeamInvitationDialogProps extends IDialogProps {
  formProps: TeamInvitationFormProps;
}

export const TeamInvitationDialog = ({
  formProps,
  ...dialogProps
}: TeamInvitationDialogProps) => {
  const { classes } = useTeamInvitationDialogStyles();

  return (
    <Dialog
      {...dialogProps}
      canCloseDialogByClickOutside={false}
      classes={classes}
      shouldHideCloseButton
    >
      <Header />
      <TeamInvitationForm {...formProps} />
    </Dialog>
  );
};

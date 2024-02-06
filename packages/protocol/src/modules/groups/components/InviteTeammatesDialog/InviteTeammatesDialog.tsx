import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { Dialog, IDialogProps } from 'uiKit/Dialog';

import {
  InviteTeammatesForm,
  InviteTeammatesFormProps,
} from './components/InviteTeammatesForm';
import { useInviteTeammatesDialogStyles } from './useInviteTeammatesDialogStyles';

export interface InviteTeammatesDialogProps
  extends IDialogProps,
  InviteTeammatesFormProps { }

export const InviteTeammatesDialog = ({
  group,
  invitedEmails,
  onClose: handleCloseDialog,
  teamMembersCount,
  teamMembersLimit,
  ...dialogProps
}: InviteTeammatesDialogProps) => {
  const {
    classes: { title, ...classes },
  } = useInviteTeammatesDialogStyles();

  return (
    <Dialog
      {...dialogProps}
      canCloseDialogByClickOutside={false}
      classes={classes}
      hasTitleWrapper={false}
      onClose={handleCloseDialog}
      title={
        <Typography className={title} component="p" variant="h6">
          {t('teams.invite-teammates-dialog.title')}
        </Typography>
      }
    >
      <InviteTeammatesForm
        group={group}
        handleCloseDialog={handleCloseDialog}
        invitedEmails={invitedEmails}
        teamMembersCount={teamMembersCount}
        teamMembersLimit={teamMembersLimit}
      />
    </Dialog>
  );
};

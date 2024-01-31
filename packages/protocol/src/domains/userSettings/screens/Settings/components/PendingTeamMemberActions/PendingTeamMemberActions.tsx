import { Button } from '@mui/material';
import { Delete, LoadingButton, MailWithArrow, Url } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';

import { useTeamMemberActionsStyles } from '../TeamMemberActions/useTeamMemberActionsStyles';

interface PendingTeamMemberActionsProps {
  inviteUrl: string;
  handleRevokeInvitation: () => void;
  handleResendInvite: () => void;
  isLoadingResendTeamInvite: boolean;
}

export const PendingTeamMemberActions = ({
  inviteUrl,
  handleRevokeInvitation,
  handleResendInvite,
  isLoadingResendTeamInvite,
}: PendingTeamMemberActionsProps) => {
  const { classes } = useTeamMemberActionsStyles();

  return (
    <div className={classes.pendingTeamMemberActions}>
      <LoadingButton
        title={t('teams.resend-invite.resend-btn-title')}
        className={classes.btn}
        size="small"
        variant="text"
        color="secondary"
        onClick={handleResendInvite}
        loading={isLoadingResendTeamInvite}
      >
        {!isLoadingResendTeamInvite && <MailWithArrow />}
      </LoadingButton>
      <CopyToClipIcon
        hideIcon
        className={classes.copyIcon}
        contentClassName={classes.copyIconContent}
        message={t('common.copy-message')}
        messageClassName={classes.copyIconMessage}
        textClassName={classes.copyIconText}
        text={inviteUrl}
        textLabel={<Url />}
      />
      <Button
        title={t('teams.revoke-invitation.title')}
        className={classes.btn}
        size="small"
        variant="text"
        color="secondary"
        onClick={handleRevokeInvitation}
      >
        <Delete />
      </Button>
    </div>
  );
};

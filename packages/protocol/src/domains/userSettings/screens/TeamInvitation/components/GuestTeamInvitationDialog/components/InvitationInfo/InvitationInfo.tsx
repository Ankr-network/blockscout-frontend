import { Divider, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { TeamAvatar } from 'domains/userSettings/components/TeamAvatar';

import { useInvitationInfoStyles } from './useInvitationInfoStyles';

export interface InvitationInfoProps {
  email: string;
  roleName: string;
  teamName: string;
}

export const InvitationInfo = ({
  email,
  roleName,
  teamName,
}: InvitationInfoProps) => {
  const title = t('teams.guest-team-invitation-dialog.title', {
    roleName,
    teamName,
  });

  const { classes } = useInvitationInfoStyles();

  return (
    <div className={classes.root}>
      <Divider className={classes.divider} />
      <TeamAvatar className={classes.avatar} />
      <Typography className={classes.title} component="div" variant="subtitle1">
        {title}
      </Typography>
      <Typography className={classes.description} variant="body2">
        {t('teams.guest-team-invitation-dialog.description')}
      </Typography>
      <Typography className={classes.email} variant="subtitle2">
        {email}
      </Typography>
    </div>
  );
};

import { makeStyles } from 'tss-react/mui';

export const useTeamInvitationFormStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(8, 10, 10),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  description: {
    marginBottom: theme.spacing(6),

    color: theme.palette.text.primary,
  },
  joinButton: {
    marginBottom: theme.spacing(3),
  },
}));

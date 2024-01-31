import { makeStyles } from 'tss-react/mui';

export const useInvitationInfoStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  divider: {
    width: '100%',
    marginBottom: theme.spacing(5),
  },
  avatar: {
    marginBottom: theme.spacing(4),
  },
  title: {
    maxWidth: 400,
    marginBottom: theme.spacing(5),

    textAlign: 'center',
    color: theme.palette.grey[900],
  },
  description: {
    marginBottom: theme.spacing(2),

    color: theme.palette.text.secondary,
  },
  email: {
    color: theme.palette.grey[900],
    fontWeight: 700,
  },
}));

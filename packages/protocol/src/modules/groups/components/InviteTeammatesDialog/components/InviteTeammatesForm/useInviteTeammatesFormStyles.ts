import { makeStyles } from 'tss-react/mui';

export const useInviteTeammatesFormStyles = makeStyles()(theme => ({
  description: {
    marginBottom: theme.spacing(6),

    whiteSpace: 'pre-wrap',

    color: theme.palette.text.secondary,
  },
  input: {
    marginBottom: theme.spacing(6),
  },
  selector: {
    marginBottom: theme.spacing(3),
  },
  permissions: {
    marginBottom: theme.spacing(8),
  },
  inviteButton: {
    marginBottom: theme.spacing(3),
  },
}));

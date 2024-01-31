import { makeStyles } from 'tss-react/mui';

export const useCreateTeamFormStyles = makeStyles()(theme => ({
  createTeamFormRoot: {
    padding: theme.spacing(8),
    width: '100%',
  },
  createTeamFormInner: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    maxWidth: 450,
  },
  divider: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(8),
    borderColor: theme.palette.grey[100],
    borderStyle: 'solid',
  },
  helperText: {
    marginTop: theme.spacing(2),
  },
  createTeamButton: {
    marginTop: theme.spacing(4),
    alignSelf: 'flex-start',
  },
}));

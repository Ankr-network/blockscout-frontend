import { makeStyles } from '@material-ui/core';

export const useEmailContentStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
  },
  title: {
    marginBottom: theme.spacing(1.5),
  },
  content: {
    position: 'relative',
    minHeight: 177,
  },
  button: {
    color: theme.palette.text.primary,
  },
  banner: {
    backgroundColor: '#FCF2E2',
    marginTop: theme.spacing(2),
  },
  subtitle: {
    marginTop: theme.spacing(1.5),
    textAlign: 'center',
    fontWeight: 400,

    '& a': {
      fontWeight: 700,
    },
  },
}));

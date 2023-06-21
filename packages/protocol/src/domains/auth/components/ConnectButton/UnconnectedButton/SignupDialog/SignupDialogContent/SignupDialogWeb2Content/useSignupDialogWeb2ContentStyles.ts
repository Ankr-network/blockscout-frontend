import { makeStyles } from 'tss-react/mui';

export const useSignupDialogWeb2ContentStyles = makeStyles()(theme => ({
  root: {
    marginTop: theme.spacing(2 * 5),
  },
  title: {
    fontSize: 16,
    marginBottom: theme.spacing(2 * 1.5),
  },
  content: {
    position: 'relative',
    minHeight: 177,
  },
  button: {
    color: theme.palette.text.primary,
  },
  banner: {
    backgroundColor: theme.palette.warning.light,
    marginTop: theme.spacing(2 * 2),
  },
  subtitle: {
    fontSize: 14,
    marginTop: theme.spacing(2 * 1.5),
    textAlign: 'center',
    fontWeight: 400,

    '& a': {
      fontWeight: 500,
      color: theme.palette.text.primary,
    },
  },
}));
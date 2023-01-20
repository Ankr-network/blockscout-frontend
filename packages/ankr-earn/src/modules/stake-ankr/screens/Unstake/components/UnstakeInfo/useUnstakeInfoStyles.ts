import { makeStyles } from '@material-ui/core';

export const useUnstakeInfoStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    marginBottom: theme.spacing(6),
  },
  info: {
    marginRight: theme.spacing(0.5),
    fontSize: 16,
    lineHeight: 1.5,
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  link: {
    fontSize: 16,
    lineHeight: 1.5,
    color: theme.palette.primary.main,
    textDecoration: 'underline',
  },
}));

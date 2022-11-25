import { makeStyles } from '@material-ui/core';

export const useEmailContentLoadingStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },
  title: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    fontSize: 28,
  },
  description: {},
}));

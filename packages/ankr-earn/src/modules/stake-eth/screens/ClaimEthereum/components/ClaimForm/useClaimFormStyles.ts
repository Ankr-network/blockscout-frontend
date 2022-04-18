import { makeStyles } from '@material-ui/core';

export const useClaimFormStyles = makeStyles(theme => ({
  box: {
    position: 'relative',
    padding: theme.spacing(7, 2, 6),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6, 7.5),
    },
  },

  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(7),
  },

  error: {
    fontSize: 14,
  },
}));

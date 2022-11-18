import { makeStyles } from '@material-ui/core';

export const useConnectWalletsModalStyles = makeStyles(theme => ({
  root: {
    maxWidth: 660,
  },

  title: {
    fontSize: 24,
    marginBottom: theme.spacing(5),

    [theme.breakpoints.up('md')]: {
      fontSize: 30,
    },
  },

  loading: {
    position: 'relative',
    padding: theme.spacing(5, 5, 5, 5),
  },
}));

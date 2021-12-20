import { makeStyles, Theme } from '@material-ui/core';

export const useConnectStyles = makeStyles<Theme>(theme => ({
  box: {
    maxWidth: 500,
    margin: '0 auto',
    padding: theme.spacing(6, 3),
    textAlign: 'center',
  },

  title: {
    margin: theme.spacing(3),
  },

  networkText: {
    margin: theme.spacing(4),
  },
}));

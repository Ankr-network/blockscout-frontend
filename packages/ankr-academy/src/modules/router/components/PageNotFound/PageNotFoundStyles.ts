import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: '10vh 0',
  },

  title: {
    marginBottom: theme.spacing(2),
  },

  button: {
    minWidth: 180,
  },
}));

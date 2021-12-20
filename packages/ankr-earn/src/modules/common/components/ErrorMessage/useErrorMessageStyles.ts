import { makeStyles, Theme } from '@material-ui/core';

export const useErrorMessageStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(5, 2),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5, 4),
    },
  },

  title: {
    marginBottom: theme.spacing(3),
  },
}));

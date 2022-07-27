import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(4, 5, 5, 5),
    borderRadius: 30,

    [theme.breakpoints.down('xs')]: {
      borderRadius: 20,
      padding: theme.spacing(2.5),
    },
  },
  title: {
    fontSize: 34,
    fontWeight: 700,
    marginBottom: theme.spacing(3),

    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(2.5),
      fontSize: 27,
    },
  },
}));

import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    gridGap: theme.spacing(2.5),
    justifyContent: 'space-between',
    padding: theme.spacing(3.75),
    borderRadius: 30,

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderRadius: 20,
      padding: theme.spacing(2.5),
    },
  },
  email: {
    fontSize: 34,
    fontWeight: 700,

    [theme.breakpoints.down('md')]: {
      fontSize: 30,
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
    },
  },
}));

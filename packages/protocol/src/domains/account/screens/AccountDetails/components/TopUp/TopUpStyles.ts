import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.paper,
    borderRadius: 24,
    padding: theme.spacing(2.5, 3.75, 3.25),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2, 3, 3),
    },

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 3, 0.5),
    },
  },
}));

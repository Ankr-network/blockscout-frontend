import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    gridGap: theme.spacing(2),
    justifyContent: 'space-between',
    padding: theme.spacing(3.75),
    borderRadius: 30,

    [theme.breakpoints.down('xs')]: {
      borderRadius: 20,
      padding: theme.spacing(2.5),
    },
  },
  email: {
    fontSize: 34,
    fontWeight: 700,
  },
}));

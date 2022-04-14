import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 940,
    marginLeft: 'auto',
    marginRight: 'auto',

    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(3.5),
    },
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(1.5, 3),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  topUp: {
    minWidth: 300,

    [theme.breakpoints.down('md')]: {
      minWidth: 'auto',
    },
  },
  payments: {
    marginTop: theme.spacing(5),

    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(4),
    },
  },
}));

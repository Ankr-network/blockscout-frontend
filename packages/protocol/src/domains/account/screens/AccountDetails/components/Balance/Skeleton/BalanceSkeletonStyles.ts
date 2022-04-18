import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',

    marginBottom: theme.spacing(1.75),
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
  },
  title: {
    width: theme.spacing(7),
    height: theme.spacing(2.5),
  },
  currency: {
    width: theme.spacing(6),
    height: theme.spacing(3),
  },
  withdrawButton: {
    width: theme.spacing(8),
    height: theme.spacing(2.5),
  },
  balance: {
    width: theme.spacing(25),
    height: theme.spacing(6.5),
    marginBottom: theme.spacing(4.75),

    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(20),
      height: theme.spacing(5),

      marginBottom: 33,
    },
  },
}));

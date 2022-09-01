import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '3px 9px',
  },
  tabs: {
    width: '100%',
    height: theme.spacing(3.5),
    marginBottom: theme.spacing(1.5),
    borderRadius: theme.spacing(2),
  },
  input: {
    width: '100%',
    height: theme.spacing(5.5),
    marginBottom: theme.spacing(2.5),
    borderRadius: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(7.5),
      height: theme.spacing(2),
    },
  },
  button: {
    width: '100%',
    height: theme.spacing(5.5),
    borderRadius: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(35),
      height: theme.spacing(2),
    },
  },
}));

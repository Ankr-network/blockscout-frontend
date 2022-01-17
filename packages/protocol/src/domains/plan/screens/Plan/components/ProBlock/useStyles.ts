import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3.5),
    },
    borderRadius: 18,
  },
  title: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(7),
    minWidth: 240,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

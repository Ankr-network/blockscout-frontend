import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  paper: {
    padding: theme.spacing(21, 2, 8),
    justifyContent: 'center',
  },

  title: {
    fontSize: 34,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    marginBottom: theme.spacing(3.5),

    [theme.breakpoints.up('sm')]: {
      maxWidth: '75%',
    },
  },

  buttons: {
    margin: theme.spacing(2.5, 0),
    textAlign: 'center',
    maxWidth: 230,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

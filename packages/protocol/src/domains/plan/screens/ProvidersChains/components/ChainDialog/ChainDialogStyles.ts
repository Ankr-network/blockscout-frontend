import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  paper: {
    padding: theme.spacing(17.5, 2.5),
    justifyContent: 'center',
  },
  chainInfo: {
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  logo: {
    maxWidth: 55,
  },

  title: {
    marginTop: theme.spacing(1),
    fontSize: 20,
  },

  buttons: {
    margin: theme.spacing(2.5, 0),
    textAlign: 'center',
  },
  button: {
    width: '100%',
  },
}));

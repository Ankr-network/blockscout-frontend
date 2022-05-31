import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useUnsupportedNetworkStyles = makeStyles<Theme>(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(5, 2),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5, 4),
    },
  },

  header: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    fontWeight: 700,
  },

  description: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    fontWeight: 400,
  },

  icon: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    fontSize: 24,
    height: '1em',
    width: '1em',
    fontStyle: 'normal',
  },
}));

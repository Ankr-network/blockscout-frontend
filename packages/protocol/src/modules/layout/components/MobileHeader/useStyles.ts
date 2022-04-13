import { makeStyles, Theme } from '@material-ui/core';

export const MOBILE_HEADER_HEIGHT = 64;

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'fixed',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    zIndex: 2,
    padding: theme.spacing(1.25, 0),
  },

  container: {
    '&&': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing(0, 2),
    },
  },
  switcher: {
    marginRight: theme.spacing(4.5),
    marginLeft: theme.spacing(1),
  },
  right: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(4, 0),
    color: theme.palette.text.primary,
  },

  container: {
    padding: theme.spacing(0, 3.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    minWidth: 142,
    marginLeft: theme.spacing(4.5),
  },
  right: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

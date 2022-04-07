import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  menuButton: {
    position: 'relative',
    width: 'auto',
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      border: '2px solid rgba(31, 34, 38, 0.1)',
    },
  },
}));

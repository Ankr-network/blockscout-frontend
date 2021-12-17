import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  paper: {
    background: theme.palette.background.default,
  },

  close: {
    '&$closeIcon': {
      position: 'absolute',
      top: 5,
      right: 5,
      width: 40,
      height: 40,
      padding: 0,
      color: theme.palette.text.primary,
      border: 'none',

      '&:hover': {
        border: 'none',
      },
    },
  },
  closeIcon: {},

  icon: {
    fontSize: 25,
  },
}));

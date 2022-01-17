import { makeStyles, Theme } from '@material-ui/core';

export const useNavItemStyles = makeStyles<Theme>(theme => ({
  root: {
    height: 'auto',
    padding: 0,
    background: 'none',
    color: theme.palette.text.secondary,
    transition: 'color 0.2s',
    fontSize: 24,

    [theme.breakpoints.up('sm')]: {
      fontSize: 30,
    },

    '&:hover': {
      color: theme.palette.primary.main,
      background: 'none',
    },
  },

  active: {
    color: theme.palette.text.primary,
    cursor: 'default',

    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
}));

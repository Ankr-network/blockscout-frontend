import { makeStyles, Theme } from '@material-ui/core';

export const useTextButtonStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: 0,
    height: 'auto',
    width: 'auto',
    minWidth: 0,

    color: theme.palette.text.secondary,
    fontWeight: 500,

    transition: '0.2s all',

    '&:hover': {
      background: 'none',
      color: theme.palette.text.primary,
    },
  },
}));

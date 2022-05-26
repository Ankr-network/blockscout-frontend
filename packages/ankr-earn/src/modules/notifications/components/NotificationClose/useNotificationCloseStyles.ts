import { makeStyles } from '@material-ui/core';

export const useNotificationCloseStyles = makeStyles(theme => ({
  root: {
    border: 'none',
    fontSize: 14,
    color: theme.palette.text.secondary,
    transition: 'color 0.2s',

    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
}));

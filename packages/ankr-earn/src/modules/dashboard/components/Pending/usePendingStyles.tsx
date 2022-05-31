import { darken, makeStyles, Theme } from '@material-ui/core';

export const usePendingStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'inline-block',
    padding: theme.spacing(0.75, 1.25),
    borderRadius: 30,
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
    fontSize: 13,
    lineHeight: 1,
    transition: 'background 0.2s',
  },

  hoverable: {
    '&:hover': {
      background: darken(theme.palette.background.default, 0.02),
    },
  },

  pendingValue: {
    display: 'inline-block',
    padding: theme.spacing(0.75, 1.25),
    borderRadius: 30,
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
    fontSize: 13,
    lineHeight: 1,
    transition: 'background 0.2s',
  },
}));

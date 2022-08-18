import { darken, makeStyles, Theme } from '@material-ui/core';

export const usePendingStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'inline-block',
    padding: theme.spacing(0.625, 1.25),

    background: theme.palette.background.default,
    color: theme.palette.primary.main,
    fontSize: 12,
    lineHeight: 1.48,
    fontWeight: 400,
    borderRadius: 8,

    transition: 'background 0.2s',
  },

  hoverable: {
    '&:hover': {
      background: darken(theme.palette.background.default, 0.02),
    },
  },

  pendingSkeleton: {
    borderRadius: 8,
  },
}));

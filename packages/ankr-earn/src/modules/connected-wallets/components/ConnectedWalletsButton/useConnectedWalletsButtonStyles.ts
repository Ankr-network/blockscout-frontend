import { alpha, makeStyles, Theme } from '@material-ui/core';

export const useConnectedWalletsButtonStyles = makeStyles<Theme>(theme => ({
  root: {
    height: 36,
    padding: theme.spacing(0, 1.75),
    fontWeight: 400,

    background: theme.palette.background.paper,
    color: theme.palette.text.primary,

    '&:hover': {
      background: alpha(theme.palette.background.paper, 0.4),
      color: theme.palette.text.primary,
    },
  },
  instanceText: {
    margin: theme.spacing(0, 1),
  },
  arrowIcon: {
    fontSize: 14,
  },
  connectButton: {
    fontWeight: 600,
  },
}));

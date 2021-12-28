import { makeStyles, Theme } from '@material-ui/core';

export const usePendingStyles = makeStyles<Theme>(theme => ({
  root: {
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(0.5, 1.25),
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
  },
  value: {
    fontSize: 13,
  },
  spinner: {
    position: 'relative',
    width: theme.spacing(3.25),
  },
}));

import { makeStyles, Theme } from '@material-ui/core';

export const usePendingStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gap: theme.spacing(0, 1),
    alignItems: 'center',
    justifyContent: 'start',
    padding: theme.spacing(0.75, 1.25),
    borderRadius: 30,
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
  },

  value: {
    fontSize: 13,
    lineHeight: 1,
  },
}));

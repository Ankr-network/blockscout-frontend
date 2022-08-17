import { makeStyles, Theme } from '@material-ui/core';

export const usePlusMinusBtnStyles = makeStyles<Theme>(theme => ({
  root: {
    width: 44,
    height: 44,
    minWidth: 44,
    padding: 0,
    borderRadius: '50%',
  },

  icon: {
    color: 'inherit',
  },

  loader: {
    color: theme.palette.primary.main,
  },
}));

import { darken, makeStyles, Theme } from '@material-ui/core';

export const useProgressBarStyles = makeStyles<Theme>(theme => ({
  root: {
    background: darken(theme.palette.background.default, 0.04),
    borderRadius: '2px',
  },
}));

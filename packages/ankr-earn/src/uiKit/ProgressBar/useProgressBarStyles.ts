import { makeStyles, Theme } from '@material-ui/core';

export const useProgressBarStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.default,
    borderRadius: '2px',
  },
}));

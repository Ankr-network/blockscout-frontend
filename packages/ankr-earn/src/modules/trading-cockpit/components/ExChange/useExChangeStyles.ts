import { makeStyles, Theme } from '@material-ui/core';

export const useExChangeStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.primary,
  },

  icon: {
    marginRight: theme.spacing(1.75),
    fontSize: 24,
    fontStyle: 'normal',
  },
}));

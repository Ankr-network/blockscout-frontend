import { makeStyles, Theme } from '@material-ui/core';

export const useButtonsItemStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  button: {
    marginLeft: theme.spacing(1),
  },
}));

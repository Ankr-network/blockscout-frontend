import { makeStyles, Theme } from '@material-ui/core';

export const useExChangeStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    color: theme.palette.text.primary,
  },

  icon: {
    marginRight: theme.spacing(1.75),
    fontSize: 24,
    fontStyle: 'normal',

    '& svg': {
      display: 'block',
      width: '1em',
      height: '1em',
    },
  },
}));

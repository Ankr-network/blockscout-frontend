import { makeStyles, Theme } from '@material-ui/core';

export const useCloseButtonStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'absolute',
    top: theme.spacing(2.5),
    right: theme.spacing(2.5),
    width: theme.spacing(4),
    minWidth: 0,
    height: theme.spacing(4),
    padding: 0,
    borderRadius: '50%',
    color: theme.palette.text.secondary,

    [theme.breakpoints.up('md')]: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

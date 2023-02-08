import { makeStyles, Theme } from '@material-ui/core';

export const useDialogStyles = makeStyles<Theme>(theme => ({
  box: {
    margin: theme.spacing(4, 0),
    padding: theme.spacing(7, 2, 2, 2),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(7.5),
    },
  },

  closeBtn: {
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

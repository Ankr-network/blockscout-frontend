import { makeStyles, Theme } from '@material-ui/core';

export const useUnstakeSuccessStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    maxWidth: 600,
    margin: '0 auto',
    padding: theme.spacing(6, 3),
    textAlign: 'center',
  },

  title: {
    fontSize: 30,
    marginBottom: theme.spacing(3),
  },

  text: {
    fontSize: 16,
    marginBottom: theme.spacing(4),
  },

  btn: {
    maxWidth: 320,
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

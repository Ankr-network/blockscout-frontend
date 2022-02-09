import { makeStyles } from '@material-ui/core';

export const useStakeSuccessDialogStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    maxWidth: 600,
    margin: '0 auto',
    textAlign: 'center',
    padding: theme.spacing(7, 0, 5),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6, 0),
    },
  },

  wrapper: {
    maxWidth: 360,
    padding: theme.spacing(0, 2),
  },

  title: {
    fontSize: 30,
    marginBottom: theme.spacing(3),
  },

  text: {
    fontSize: 18,
    marginBottom: theme.spacing(6.25),
  },

  test: {
    background: 'red',
  },

  closeBtn: {
    position: 'absolute',
    top: theme.spacing(1.5),
    right: theme.spacing(1.5),

    minWidth: 0,
    width: 40,
    height: 40,
    padding: 0,

    borderRadius: '50%',
    color: theme.palette.text.secondary,

    [theme.breakpoints.up('md')]: {
      top: theme.spacing(2.5),
      right: theme.spacing(2.5),
    },

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

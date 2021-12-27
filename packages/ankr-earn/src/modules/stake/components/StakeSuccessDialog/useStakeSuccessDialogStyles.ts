import { makeStyles, Theme } from '@material-ui/core';

export const useStakeSuccessDialogStyles = makeStyles<Theme>(theme => ({
  box: {
    display: 'inline-flex',
    justifyContent: 'center',
    margin: theme.spacing(4, 0),
    textAlign: 'center',
    padding: theme.spacing(5, 2, 2, 2),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(7.5),
    },
  },

  wrapper: {
    maxWidth: 360,

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3, 0),
    },
  },

  title: {
    fontSize: 30,
    marginBottom: theme.spacing(3),
  },

  text: {
    fontSize: 18,
    marginBottom: theme.spacing(6.25),
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

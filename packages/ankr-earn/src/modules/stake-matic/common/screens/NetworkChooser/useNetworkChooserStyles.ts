import { alpha, makeStyles } from '@material-ui/core';

export const useNetworkChooserStyles = makeStyles(theme => ({
  paper: {
    position: 'relative',
    padding: theme.spacing(8, 0, 5),
    textAlign: 'center',

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6.25, 0, 11),
    },
  },

  container: {
    maxWidth: 410,
    width: '100%',
    margin: '0 auto',
  },

  title: {
    margin: theme.spacing(0, 0, 4),

    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(8),
    },
  },

  chooseItemArea: {
    width: '100%',
    height: '100%',
    margin: '0 auto',
    padding: theme.spacing(2.5, 2.5, 2.5, 2.5),
    display: 'flex',

    color: theme.palette.text.primary,
    border: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
    borderRadius: 18,
    cursor: 'pointer',

    [theme.breakpoints.up('sm')]: {
      maxWidth: 176,
      minHeight: 176,
    },

    '&:hover': {
      backgroundColor: alpha(theme.palette.text.secondary, 0.2),
    },

    '& > span': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
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
    color: theme.palette.text.secondary,
    borderRadius: '50%',

    [theme.breakpoints.up('md')]: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },

  chooseItemIcon: {
    fontSize: 70,
  },

  chooseItemTitle: {
    margin: theme.spacing(2.5, 0, 0, 0),
    fontWeight: 700,
  },
}));

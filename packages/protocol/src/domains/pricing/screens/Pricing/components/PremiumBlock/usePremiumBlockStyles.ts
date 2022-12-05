import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const usePremiumBlockStyles = makeStyles<Theme>(theme => ({
  container: {
    background:
      'linear-gradient(270.26deg, #013CD3 0.23%, #6235D0 26.13%, #AF34B1 49.87%, #E85658 76.96%, #FF7710 99.78%)',
    borderRadius: theme.spacing(7.5),
    padding: 4,
    maxWidth: 810,
    marginLeft: 'auto',
    marginRight: 'auto',

    [theme.breakpoints.down('sm')]: {
      borderRadius: theme.spacing(3.5),
    },
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: 76,
    textAlign: 'center',
    position: 'relative',
    borderRadius: theme.spacing(7.25),

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 3.5),
      borderRadius: theme.spacing(3.25),
    },

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(5, 2),
      borderRadius: theme.spacing(3.25),
    },
  },
  wrapper: {
    padding: theme.spacing(0, 3),

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 2),
    },
  },
  blockTitle: {
    fontSize: 52,
    marginBottom: theme.spacing(5),
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',

    [theme.breakpoints.down('xs')]: {
      fontSize: 32,
      maxWidth: 285,
      marginBottom: theme.spacing(2.5),
    },
  },
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(5),
    fontSize: 35,
    maxWidth: 500,
    marginLeft: 'auto',
    marginRight: 'auto',

    [theme.breakpoints.down('sm')]: {
      fontSize: 28,
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: 26,
    },
  },
  button: {
    '& button': {
      fontSize: 16,
      width: 320,
      height: 60,
      marginBottom: 60,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        maxWidth: 320,
      },
    },
  },
  form: {
    width: 390,
    margin: theme.spacing(0, 'auto'),

    [theme.breakpoints.down('xs')]: {
      width: 360,
    },

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  info: {
    fontWeight: 400,
    marginBottom: theme.spacing(1),

    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  icon: {},
  link: {
    padding: 0,
    height: 'auto',
    fontSize: 16,
    alignSelf: 'center',

    '&:hover': {
      background: 'none',
    },
  },
}));

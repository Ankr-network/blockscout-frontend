import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      gap: 6,
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'unset',
      justifyContent: 'unset',
      height: 'unset',
    },
  },
  amount: {
    marginTop: 43,
    marginBottom: 10,
    [theme.breakpoints.down('sm')]: {
      marginTop: 'unset',
      marginBottom: 'unset',
    },
  },
  button: {
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      maxWidth: 86,
    },

    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
}));

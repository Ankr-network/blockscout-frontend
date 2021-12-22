import { makeStyles, Theme } from '@material-ui/core';

export const useStakeSuccessful = makeStyles<Theme>(theme => ({
  box: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    maxWidth: 700,
    margin: theme.spacing(0, 'auto', 4, 'auto'),
    borderRadius: 18,
    border: 'none',
    padding: theme.spacing(7.5),
    textAlign: 'center',
    marginTop: theme.spacing(10),

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 2, 2, 2),
    },
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 360,

    '& h1': {
      fontSize: 30,
      marginBottom: theme.spacing(3),
    },

    '& p': {
      fontSize: 18,
      marginBottom: theme.spacing(6.25),
    },
  },

  button: {
    marginBottom: theme.spacing(2.5),

    '&:last-of-type': {
      marginBottom: theme.spacing(0),
    },
  },
}));

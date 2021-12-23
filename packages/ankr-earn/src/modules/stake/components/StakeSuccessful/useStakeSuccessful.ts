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

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3, 0),
    },
  },

  button: {
    marginBottom: theme.spacing(2.5),

    '&:last-of-type': {
      marginBottom: theme.spacing(0),
    },
  },

  closeBtn: {
    position: 'absolute',
    top: theme.spacing(2.5),
    right: theme.spacing(2.5),
    padding: 0,
    width: theme.spacing(5),
    minWidth: theme.spacing(5),
    height: theme.spacing(5),
    borderRadius: '50%',
    border: `1px solid ${theme.palette.text.secondary}`,
    transition: '0.2s all',
    '& svg path': {
      transition: '0.2s all',
    },
    '&:hover': {
      borderColor: theme.palette.background.paper,
      background: theme.palette.background.paper,
      '& svg path': {
        fill: theme.palette.primary.main,
        opacity: 1,
      },
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(4),
      minWidth: theme.spacing(4),
      height: theme.spacing(4),
    },
  },
}));

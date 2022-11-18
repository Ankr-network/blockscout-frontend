import { makeStyles } from '@material-ui/core';

export const useConnectTileStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(1, 2, 1, 1),

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',

    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: 18,
    cursor: 'pointer',
    transition: 'background 0.2s',

    [theme.breakpoints.up('sm')]: {
      height: 144,
      flexDirection: 'column',
      justifyContent: 'center',
      padding: theme.spacing(0),
    },

    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },

  disabled: {
    backgroundColor: theme.palette.action.disabledBackground,
    borderColor: theme.palette.action.disabledBackground,

    '&:hover': {
      backgroundColor: theme.palette.action.disabledBackground,
    },
  },

  disabledCursor: {
    cursor: 'not-allowed',
  },

  title: {
    fontSize: 14,
    marginLeft: theme.spacing(1),

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2.25, 0, 0, 0),
    },
  },

  install: {
    marginLeft: 'auto',
    color: theme.palette.primary.main,
    fontSize: 13,
    fontWeight: 700,

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0.5, 0, 0, 0),
    },
  },
}));

import { alpha, makeStyles } from '@material-ui/core';

export const useConnectedWalletsNetworkStyles = makeStyles(theme => ({
  root: {},
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1.75),
  },
  network: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttons: {
    display: 'flex',
  },
  button: {
    height: 24,
    padding: 0,

    fontSize: 14,
    color: theme.palette.text.secondary,
    fontWeight: 500,
    transition: '0.2s color',

    marginRight: theme.spacing(1),

    '&:hover': {
      background: 'none',
      color: theme.palette.primary.main,
    },

    '&:last-of-type': {
      marginRight: 0,
    },
  },
  buttonText: {
    marginLeft: theme.spacing(0.5),
  },
  instances: {
    borderRadius: theme.spacing(2),
    background: theme.palette.background.default,
  },
  instance: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 16,
    borderBottom: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
    padding: theme.spacing(1.75, 0),

    '&:last-child': {
      borderBottom: 'none',
    },
  },
  instanceText: {
    marginLeft: theme.spacing(1),
  },
  instanceLeftSide: {
    display: 'flex',
  },
  instanceIcon: {
    transition: '0.2s transform',
  },
  instanceIconRotate: {
    transform: 'rotate(180deg)',
  },
  instanceOpener: {
    background: 'none',
    padding: theme.spacing(1.75, 2.5),
    height: 'auto',
    width: '100%',
    borderRadius: 0,
    alignItems: 'center',
    lineHeight: 'inherit',
    color: theme.palette.text.primary,
    fontWeight: 400,
    cursor: 'default',
    transition: '0.2s all',

    '&:active': {
      transform: 'none',
    },
    '&:hover': {
      background: 'none',
    },
  },
  instanceOpenerOn: {
    cursor: 'pointer',

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  instanceInner: {
    margin: theme.spacing(0, 2.5, 0, 2.5),
    cursor: 'pointer',

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

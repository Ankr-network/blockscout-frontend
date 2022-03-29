import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    height: 0,
    width: '100%',
    position: 'relative',
    paddingBottom: '100%',

    [theme.breakpoints.down('xs')]: {
      cursor: 'pointer',
    },
  },
  cardWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    background: theme.palette.background.paper,
  },
  chainInfo: {
    background: theme.palette.background.paper,

    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',

    transitionDuration: '200ms',
    transitionTimingFunction: 'linear',
    transformOrigin: 'marginTop',
  },
  logo: {
    maxWidth: 55,
  },
  chainInfoHover: {
    marginTop: -20,
  },

  title: {
    marginTop: theme.spacing(1),

    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
  button: {
    width: '100%',
  },
  buttons: {
    opacity: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: theme.spacing(2.5, 3),

    transitionDuration: '200ms',
    transitionTimingFunction: 'linear',
    transformOrigin: 'opacity',
  },
  hoveredButtons: {
    opacity: 1,
  },
}));

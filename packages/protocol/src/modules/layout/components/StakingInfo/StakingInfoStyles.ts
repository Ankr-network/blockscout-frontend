import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.paper,
    borderRadius: 15,
    marginBottom: theme.spacing(4),
    padding: theme.spacing(7.5, 2.5, 2),
    position: 'relative',
    cursor: 'pointer',

    '&:hover': {
      '& $link': {
        color: theme.palette.common.black,
      },

      '& $icon': {
        transform: 'translateX(5px)',
      },
    },
  },
  text: {
    textAlign: 'center',
  },
  link: {
    /* disabled pointer events because whole component is clickable */
    pointerEvents: 'none',
    marginTop: theme.spacing(0.5),
    whiteSpace: 'nowrap',
    background: 'transparent',
    padding: 6,
    width: '100%',
  },
  icon: {
    width: 14,
    height: 14,
    transition: 'transform 0.3s',
  },
  image: {
    position: 'absolute',
    maxWidth: 84,
    left: '50%',
    top: 0,
    transform: 'translate(-50%, -50%)',
    zIndex: 1,

    '&:after': {
      content: '""',
      display: 'block',
      width: 84,
      height: 56,
      position: 'absolute',
      bottom: -23,
      zIndex: 0,

      background:
        'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.12) 75%, rgba(0, 0, 0, 0) 100%)',
      opacity: 0.3,
      left: '50%',
      transform: 'translateX(-50%)',
    },

    '& img': {
      width: '100%',
      position: 'relative',
    },
  },
}));

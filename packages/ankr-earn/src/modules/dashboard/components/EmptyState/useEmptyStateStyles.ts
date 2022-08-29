import { makeStyles } from '@material-ui/core';

export const useEmptyStateStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 2, 6),
    textAlign: 'center',

    [theme.breakpoints.up('md')]: {
      position: 'relative',
      zIndex: 0,
      padding: theme.spacing('235px', 6, 8),
    },
  },

  title: {
    fontSize: 32,
    marginBottom: theme.spacing(3),

    [theme.breakpoints.up('md')]: {
      maxWidth: 560,
      margin: theme.spacing(0, 'auto', 4),
      fontSize: 45,
    },
  },

  button: {
    width: 220,
    borderRadius: 16,
  },

  imgWrap: {
    display: 'block',
    position: 'relative',

    maxWidth: 210,
    margin: theme.spacing(0, 'auto', 3),

    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      zIndex: -1,
      top: 58,
      left: 0,
      right: 0,
      maxWidth: '90%',
      margin: '0 auto',
    },

    [theme.breakpoints.up('xl')]: {
      maxWidth: 1062,
    },

    '&:before': {
      content: `''`,
      display: 'block',
      paddingTop: getImgRatioPct(210, 145),

      [theme.breakpoints.up('md')]: {
        paddingTop: getImgRatioPct(1062, 286),
      },
    },
  },

  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',

    objectFit: 'scale-down',
  },
}));

function getImgRatioPct(width: number, height: number): string {
  return `${(height / width) * 100}%`;
}

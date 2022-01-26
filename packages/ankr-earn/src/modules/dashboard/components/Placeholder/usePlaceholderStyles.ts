import { makeStyles, Theme } from '@material-ui/core';

export const usePlaceholderStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2, 2, 6),
    textAlign: 'center',

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4, 2, 10),
    },
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),

    [theme.breakpoints.up('sm')]: {
      fontSize: 30,
    },
  },

  imgWrap: {
    width: '100%',
    maxWidth: 200,
    position: 'relative',

    '&:before': {
      content: `''`,
      display: 'block',
      paddingTop: '100%',
    },
  },

  img: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'scale-down',
  },

  buttonWrap: {
    minWidth: 170,
  },
}));

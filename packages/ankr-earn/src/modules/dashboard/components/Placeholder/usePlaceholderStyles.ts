import { makeStyles, Theme } from '@material-ui/core';

export const usePlaceholderStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(8, 2, 8, 2),
    textAlign: 'center',
  },
  title: {
    margin: theme.spacing(3, 0, 2.5, 0),
    fontSize: 24,
    fontWeight: 'bold',

    [theme.breakpoints.up('sm')]: {
      fontSize: 30,
    },
  },

  imgWrap: {
    width: '100%',
    maxWidth: 119,
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

import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(() => ({
  hidden: {
    visibility: 'hidden',
  },
  loaderWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  downLoader: {
    '&&': {
      position: 'absolute',
      color: '#BFC6D0',
    },
  },
}));

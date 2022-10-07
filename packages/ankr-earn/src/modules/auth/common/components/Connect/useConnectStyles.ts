import { makeStyles } from '@material-ui/core';

export const useConnectStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 440,
    maxHeight: 560,
    height: '58vh',
    padding: theme.spacing(2, 2, 2, 2),
    textAlign: 'center',
  },

  imgArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleArea: {
    margin: theme.spacing(3, 0, 2.5, 0),
    lineHeight: 1.5,

    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
    },
  },

  img: {
    width: '100%',
    maxWidth: 119,
    height: 'auto',
  },
}));

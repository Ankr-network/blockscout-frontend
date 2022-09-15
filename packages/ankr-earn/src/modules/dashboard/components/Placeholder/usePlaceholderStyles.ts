import { makeStyles } from '@material-ui/core';

export const usePlaceholderStyles = makeStyles(theme => ({
  root: {
    margin: '0 auto',
    padding: theme.spacing(8, 2, 8, 2),
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

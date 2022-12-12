import { makeStyles } from '@material-ui/core';

export const useNewBNBModalStyles = makeStyles(theme => ({
  root: {
    maxWidth: 620,

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6, 5, 5),
    },
  },

  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2.5),
  },

  text: {
    marginBottom: theme.spacing(3),
    fontWeight: 400,

    '& a': {
      color: theme.palette.primary.main,
      wordBreak: 'break-word',

      '&:hover': {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
      },
    },
  },
  imgWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2.5),
  },
  img: {
    height: theme.spacing(11.5),
    width: theme.spacing(11.5),
  },
}));

import { makeStyles, Theme } from '@material-ui/core';

export const useFaqStyles = makeStyles<Theme>(theme => ({
  box: {
    position: 'relative',
    maxWidth: 700,
    width: '100%',
    margin: theme.spacing(0, 'auto', 4, 'auto'),
    borderRadius: 18,
    border: 'none',
    padding: theme.spacing(7.5),

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 2, 2, 2),
    },
  },

  title: {
    fontWeight: 'bold',
    fontSize: 30,
    width: '100%',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },

  answer: {
    '& a': {
      color: theme.palette.text.secondary,

      '&:hover': {
        color: theme.palette.primary.main,
      },
    },

    '& code': {
      background: theme.palette.grey[200],
      fontSize: '0.8em',
      padding: '0.1em 0.3em',
    },
  },
}));

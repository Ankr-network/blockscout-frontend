import { makeStyles, Theme } from '@material-ui/core';

export const useConnectStyles = makeStyles<Theme>(theme => ({
  box: {
    maxWidth: 500,
    margin: '0 auto',
    padding: theme.spacing(6, 3),
    textAlign: 'center',
  },

  headerContainer: {
    margin: theme.spacing(0, 0, 3),
  },

  question: {
    margin: theme.spacing(0, 0, 7),
    fontSize: 16,
  },

  button: {
    height: 52,
    margin: theme.spacing(0, 0, 3),

    [theme.breakpoints.up('sm')]: {
      maxWidth: 262,
    },
  },

  info: {
    fontSize: 16,
    margin: '0 auto',

    '& .highlight': {
      color: theme.palette.text.primary,
    },
  },

  networksWrapper: {
    borderTop: `1px solid ${theme.palette.background.default}`,
    margin: theme.spacing(4, -3, 0),
    padding: theme.spacing(3.5, 3, 0),
  },

  networksTitle: {
    marginBottom: theme.spacing(3),
  },
}));

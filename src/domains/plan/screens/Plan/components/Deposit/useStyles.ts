import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(7, 7, 7, 10.5),
    borderRadius: 18,

    [theme.breakpoints.down(1300)]: {
      padding: theme.spacing(4),
    },

    [theme.breakpoints.down('lg')]: {
      flexWrap: 'wrap',
      padding: theme.spacing(4, 6),
    },

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2.5),
    },
  },
  left: {
    marginRight: theme.spacing(7),
  },
  right: {
    maxWidth: '40%',
    [theme.breakpoints.down('lg')]: {
      marginTop: theme.spacing(2),
      maxWidth: '100%',
    },
  },
  top: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  info: {
    fontWeight: 500,

    '&:not(:last-child)': {
      marginBottom: theme.spacing(1.5),
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  divider: {
    margin: theme.spacing(2.5, 0, 1.5),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(7.5, 15, 7.5, 10.5),
    borderRadius: 18,

    [theme.breakpoints.down('lg')]: {
      flexWrap: 'wrap',
      padding: theme.spacing(4, 6),
    },
  },
  left: {
    marginRight: theme.spacing(10),
    width: '50%',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  right: {
    [theme.breakpoints.down('lg')]: {
      marginTop: theme.spacing(2),
    },
  },
  info: {
    fontWeight: 500,

    '&:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  divider: {
    margin: theme.spacing(2.5, 0),
  },
}));

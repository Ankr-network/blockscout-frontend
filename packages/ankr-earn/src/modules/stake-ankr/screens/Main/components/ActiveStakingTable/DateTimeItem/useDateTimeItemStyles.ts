import { makeStyles } from '@material-ui/core';

export const useDateTimeItemStyles = makeStyles(theme => ({
  root: {
    alignItems: 'inherit',
    justifyContent: 'flex-end',

    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'inherit',
      justifyContent: 'flex-start',
    },
  },

  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'inherit',
    justifyContent: 'center',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),

    [theme.breakpoints.up('sm')]: {
      marginBottom: 0,
    },
  },

  time: {
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
}));

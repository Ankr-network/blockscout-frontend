import { makeStyles } from '@material-ui/core';

export const useLocationItemStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',

    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start',
    },
  },

  simpleText: {
    fontSize: 14,
    fontWeight: 400,
    marginLeft: theme.spacing(1),
  },

  icon: {
    borderRadius: '25%',
  },
}));

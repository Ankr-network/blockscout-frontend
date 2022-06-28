import { makeStyles } from '@material-ui/core';

export const useNodeItemStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',

    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start',
    },
  },

  networkIcon: {
    fontSize: 32,
  },

  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: theme.spacing(2),
  },

  secondary: {
    fontSize: 14,
    fontWeight: 400,
  },
}));

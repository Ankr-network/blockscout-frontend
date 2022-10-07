import { makeStyles } from '@material-ui/core';

export const useBaseAmountWithIconStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'inherit',
    marginBottom: theme.spacing(1),

    [theme.breakpoints.up('sm')]: {
      marginBottom: 0,
      alignItems: 'inherit',
      justifyContent: 'inherit',
    },
  },

  infoWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),

    [theme.breakpoints.up('sm')]: {
      marginBottom: 0,
    },
  },

  icon: {
    width: 28,
    height: 28,
    marginRight: theme.spacing(1),
  },

  values: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  usdAmount: {
    fontSize: 13,
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5),
  },
}));

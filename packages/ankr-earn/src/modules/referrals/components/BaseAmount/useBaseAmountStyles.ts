import { makeStyles } from '@material-ui/core';

export const useBaseAmountStyles = makeStyles(theme => ({
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

  icon: {
    width: 28,
    height: 28,
    marginRight: theme.spacing(1),
  },

  values: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',

    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
    },
  },

  usdAmount: {
    fontSize: 13,
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5),
  },
}));

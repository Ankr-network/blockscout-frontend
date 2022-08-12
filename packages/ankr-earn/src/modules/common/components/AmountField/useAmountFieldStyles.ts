import { makeStyles } from '@material-ui/core';

export const useAmountFieldStyles = makeStyles(theme => ({
  balance: {
    display: 'flex',
    alignItems: 'center',
    float: 'right',
    fontSize: 12,
    position: 'relative',
    zIndex: 1,
  },

  longBalance: {
    marginBottom: 20,

    [theme.breakpoints.up('sm')]: {
      marginBottom: -20,
    },
  },

  shortBalance: {
    marginBottom: -20,
  },

  balanceLoadingBox: {
    display: 'inline-flex',
    marginLeft: theme.spacing(1),
    verticalAlign: 'middle',
  },
}));

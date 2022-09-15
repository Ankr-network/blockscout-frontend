import { makeStyles } from '@material-ui/core';

export const useAmountFieldStyles = makeStyles(theme => ({
  balance: {
    display: 'flex',
    alignItems: 'center',
    float: 'right',
    fontSize: 12,
    fontWeight: 400,
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

  maxButton: {
    height: 22,
    width: 41,
    minWidth: 41,
    padding: 0,
    color: theme.palette.text.secondary,
    fontWeight: 400,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.background.default}`,
    borderRadius: 6,

    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

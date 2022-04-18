import { makeStyles } from '@material-ui/core';

export const useAmountFieldStyles = makeStyles(theme => ({
  balance: {
    float: 'right',
    marginBottom: -20,
    fontSize: 14,
    position: 'relative',
    zIndex: 1,
  },

  balanceLoadingBox: {
    display: 'inline-flex',
    marginLeft: theme.spacing(1),
    verticalAlign: 'middle',
  },
}));

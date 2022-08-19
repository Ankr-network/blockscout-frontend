import { makeStyles } from '@material-ui/core';

export const useAmountStyles = makeStyles(theme => ({
  amount: {
    fontSize: 22,
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: '-0.02em',
  },

  amountInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    lineHeight: 1,

    fontSize: 14,
    fontWeight: 500,
  },
}));

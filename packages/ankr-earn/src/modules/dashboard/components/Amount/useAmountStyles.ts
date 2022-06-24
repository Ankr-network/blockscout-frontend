import { makeStyles } from '@material-ui/core';

export const useAmountStyles = makeStyles(theme => ({
  amount: {
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 1,

    [theme.breakpoints.up('sm')]: {
      fontSize: 40,
    },
  },

  amountInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    lineHeight: 1,
  },

  tooltipBtn: {
    margin: theme.spacing(0, 0, 0, 0.5),
    cursor: 'help',
  },

  amountInfoIcon: {
    display: 'block',
  },
}));

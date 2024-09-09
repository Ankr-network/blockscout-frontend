import { makeStyles } from 'tss-react/mui';

export const useOngoingPaymentStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: theme.spacing(6, 8),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: theme.spacing(4),
    },

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(5.5, 4),
    },
  },
  amount: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencyIcon: {
    width: 24,
    height: 24,

    marginRight: theme.spacing(1),
  },
  networkIcon: {
    top: 0,
    right: theme.spacing(-1),

    width: 12,
    height: 12,
  },
}));

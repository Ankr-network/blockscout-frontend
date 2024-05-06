import { makeStyles } from 'tss-react/mui';

export const useOngoingPaymentsStyles = makeStyles()(theme => ({
  ongoingPaymentRoot: {},
  ongoingPaymentTitle: {
    marginBottom: theme.spacing(5),

    color: theme.palette.grey[900],
  },
  ongoingPaymentPaper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(6, 8),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: theme.spacing(4),
    },
  },
  paymentValue: {
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
    width: 12,
    height: 12,
    top: 0,
    right: theme.spacing(-1),
  },
}));

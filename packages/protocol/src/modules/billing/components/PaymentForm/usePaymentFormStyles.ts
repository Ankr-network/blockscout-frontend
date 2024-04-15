import { makeStyles } from 'tss-react/mui';

export const usePaymentFormStyles = makeStyles()(theme => ({
  paymentFormRoot: {
    padding: theme.spacing(8),

    borderRadius: 20,

    backgroundColor: theme.palette.background.paper,
  },
  title: {
    marginBottom: theme.spacing(4),

    color: theme.palette.grey[900],
  },
  paymentTabs: {
    marginBottom: theme.spacing(4),
  },
  currencyTabs: {
    marginBottom: theme.spacing(2),
  },
  amountField: {
    marginBottom: theme.spacing(8),
  },
}));

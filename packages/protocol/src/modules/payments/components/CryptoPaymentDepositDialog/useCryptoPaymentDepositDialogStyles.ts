import { makeStyles } from 'tss-react/mui';

export const useCryptoPaymentDepositDialogStyles = makeStyles()(theme => ({
  paper: {
    width: 600,

    borderRadius: 40,
  },
  title: {
    marginBottom: theme.spacing(8),
  },
  stepper: {
    marginBottom: theme.spacing(5),
  },
  paymentDetails: {
    marginBottom: theme.spacing(8),
  },
}));

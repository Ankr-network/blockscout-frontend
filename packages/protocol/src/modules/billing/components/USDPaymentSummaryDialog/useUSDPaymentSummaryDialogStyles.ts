import { makeStyles } from 'tss-react/mui';

export const useUSDPaymentSummaryDialog = makeStyles()(theme => ({
  paper: {
    width: 600,

    borderRadius: 40,
  },
  title: {
    marginBottom: theme.spacing(8),
  },
  list: {
    marginBottom: theme.spacing(8),
  },
  buttons: {
    marginBottom: theme.spacing(4),
  },
}));

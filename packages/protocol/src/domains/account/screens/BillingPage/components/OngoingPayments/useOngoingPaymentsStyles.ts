import { makeStyles } from 'tss-react/mui';

export const useOngoingPaymentsStyles = makeStyles()(theme => ({
  ongoingPaymentRoot: {},
  ongoingPaymentTitle: {
    marginBottom: theme.spacing(5),
  },
  ongoingPaymentPaper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(6, 8),
  },
  paymentValue: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconAnkr: {
    marginRight: theme.spacing(),
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    padding: theme.spacing(1),
    color: theme.palette.common.white,
  },
}));

import { makeStyles } from 'tss-react/mui';

export const useOngoingPaymentStatusStyles = makeStyles()(theme => ({
  paymentStatus: {
    borderRadius: 8,
    padding: theme.spacing(0.5, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pending: {
    backgroundColor: theme.palette.grey[100],
  },
  success: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.main,
  },
  error: {
    backgroundColor: theme.palette.error.light,
  },
  icon: {
    marginRight: theme.spacing(1),
    width: 16,
    height: 16,
  },
  iconSuccess: {
    color: theme.palette.success.main,
  },
  iconError: {
    color: theme.palette.error.main,
  },
}));

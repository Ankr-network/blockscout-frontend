import { makeStyles } from 'tss-react/mui';

export const useTotalPaymentInfoStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
  amount: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailedAmount: {
    alignSelf: 'flex-end',
  },
}));

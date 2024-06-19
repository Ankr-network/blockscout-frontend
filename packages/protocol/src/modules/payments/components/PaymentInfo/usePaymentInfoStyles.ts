import { makeStyles } from 'tss-react/mui';

export const usePaymentInfoStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    color: theme.palette.grey[900],
  },
  description: {
    color: theme.palette.grey[600],
  },
}));

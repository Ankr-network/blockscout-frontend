import { makeStyles } from 'tss-react/mui';

export const useOngoingPaymentsStyles = makeStyles()(theme => ({
  title: {
    marginBottom: theme.spacing(5),

    color: theme.palette.grey[900],
  },
  payments: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5),
  },
}));

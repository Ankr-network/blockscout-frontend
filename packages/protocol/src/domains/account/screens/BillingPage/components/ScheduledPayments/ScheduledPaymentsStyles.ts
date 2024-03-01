import { makeStyles } from 'tss-react/mui';

export const useScheduledPaymentsStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
    flexWrap: 'wrap',
  },
  subscriptions: {
    display: 'flex',
    gap: theme.spacing(2),
  },
}));

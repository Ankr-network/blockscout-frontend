import { makeStyles } from 'tss-react/mui';

export const useRecurringAmountStyles = makeStyles()(theme => ({
  recurringAmountRoot: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
}));

import { makeStyles } from 'tss-react/mui';

export const useEditSubscriptionsDialogStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5),
  },
  subscriptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

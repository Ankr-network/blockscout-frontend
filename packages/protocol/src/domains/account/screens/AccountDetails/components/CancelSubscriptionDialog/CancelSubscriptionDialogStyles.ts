import { makeStyles } from 'tss-react/mui';

export const useCancelSubscriptionDialogStyles = makeStyles()(theme => ({
  title: {
    display: 'flex',
    alignItems: 'center',

    fontSize: 35,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(7),
  },
  description: {
    fontWeight: 400,
  },
  buttons: {
    display: 'flex',

    gap: theme.spacing(3),
  },
}));

import { makeStyles } from 'tss-react/mui';

export const useHeaderStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    marginBottom: theme.spacing(4),
  },
  amount: {
    marginBottom: theme.spacing(3),

    color: theme.palette.grey[900],
  },
  amountUsd: {
    color: theme.palette.text.secondary,
  },
}));

import { makeStyles } from 'tss-react/mui';

export const useHeaderStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconsRoot: {
    width: 48,
    height: 48,
    position: 'relative',
  },
  icon: {
    width: 48,
    height: 48,
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

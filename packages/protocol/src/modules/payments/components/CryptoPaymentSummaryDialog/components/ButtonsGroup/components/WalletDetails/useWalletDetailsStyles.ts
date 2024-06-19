import { makeStyles } from 'tss-react/mui';

export const useWalletDetailsStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  label: {
    color: theme.palette.grey[900],
  },
}));

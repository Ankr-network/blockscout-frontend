import { makeStyles } from 'tss-react/mui';

export const useNoConnectedWalletButtonsStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
}));

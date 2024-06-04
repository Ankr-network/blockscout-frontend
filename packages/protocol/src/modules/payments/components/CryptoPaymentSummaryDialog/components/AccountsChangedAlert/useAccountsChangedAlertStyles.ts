import { makeStyles } from 'tss-react/mui';

export const useAccountsChangedAlertStyles = makeStyles()(theme => ({
  text: {
    color: theme.palette.grey[900],
  },
}));

import { makeStyles } from 'tss-react/mui';

export const useInsufficientBalanceAlertStyles = makeStyles()(theme => ({
  text: {
    color: theme.palette.grey[900],
  },
}));

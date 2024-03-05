import { makeStyles } from 'tss-react/mui';

export const usePartialTxFeeAttributeStyles = makeStyles()(theme => ({
  label: {
    color: theme.palette.text.secondary,
  },
  amount: {
    color: theme.palette.text.secondary,
  },
}));

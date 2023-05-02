import { makeStyles } from 'tss-react/mui';

export const useNativeAmountFormStyles = makeStyles()(theme => ({
  amountField: {
    marginBottom: theme.spacing(3),
  },
  pricingLink: {
    marginBottom: theme.spacing(10),
  },
}));

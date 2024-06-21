import { makeStyles } from 'tss-react/mui';

export const useAmountStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencyIcon: {
    width: 24,
    height: 24,

    marginRight: theme.spacing(1),
  },
  networkIcon: {
    top: 0,
    right: theme.spacing(-1),

    width: 12,
    height: 12,
  },
}));

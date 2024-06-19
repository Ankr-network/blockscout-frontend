import { makeStyles } from 'tss-react/mui';

export const useCurrencyItemStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '100%',
    padding: theme.spacing(2),
  },
  currency: {
    display: 'flex',
    alignItems: 'center',
  },
  currencyIcon: {
    marginRight: theme.spacing(2),
  },
  checkIcon: {
    color: theme.palette.primary.main,
  },
}));

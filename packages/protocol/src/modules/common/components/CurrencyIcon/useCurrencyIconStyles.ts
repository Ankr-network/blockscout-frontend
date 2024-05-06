import { makeStyles } from 'tss-react/mui';

export const useCurrencyIconStyles = makeStyles()(theme => ({
  root: {
    width: 48,
    height: 48,
    position: 'relative',
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: theme.spacing(4),
  },
  networkIcon: {
    position: 'absolute',
    width: 24,
    height: 24,
    right: theme.spacing(-2),
  },
}));

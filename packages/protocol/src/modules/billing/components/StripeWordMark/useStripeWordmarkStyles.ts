import { makeStyles } from 'tss-react/mui';

export const useStripeWordmarkStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: theme.palette.text.secondary,
  },
  logo: {
    height: 20,

    fontSize: 40,
  },
}));

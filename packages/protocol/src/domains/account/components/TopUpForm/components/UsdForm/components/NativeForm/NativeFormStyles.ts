import { makeStyles } from 'tss-react/mui';

export const useNativeFormStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    flexGrow: 1,
  },
  amountLabel: {
    marginBottom: theme.spacing(2),

    color: theme.palette.text.primary,
    letterSpacing: '-0.01em',

    lineHeight: '135%',
  },
  amount: {
    marginTop: 'auto',
    marginBottom: 'auto',

    [theme.breakpoints.down('sm')]: {
      marginTop: 'unset',
      marginBottom: 'unset',
    },
  },
  info: {
    color: theme.palette.text.primary,
    fontSize: 14,
  },
}));

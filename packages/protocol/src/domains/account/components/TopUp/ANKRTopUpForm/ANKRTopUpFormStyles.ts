import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    gap: theme.spacing(4),
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
  button: {
    width: '100%',
    height: 48,

    borderRadius: 17,
  },
  info: {
    color: theme.palette.text.primary,
    fontSize: 14,
  },
}));

import { makeStyles } from 'tss-react/mui';

export const useDisabledNativeFormStyles = makeStyles()(theme => ({
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
  button: {
    width: '100%',
    height: 48,

    borderRadius: 17,
  },
}));

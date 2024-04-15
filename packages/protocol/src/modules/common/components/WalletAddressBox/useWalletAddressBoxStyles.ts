import { makeStyles } from 'tss-react/mui';

export const useWalletAddressBoxStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),

    padding: theme.spacing(3),
    paddingRight: theme.spacing(2),
    maxHeight: 48,

    borderRadius: 16,

    backgroundColor: theme.palette.background.default,
  },
  icon: {
    width: 19,
    height: 19,
  },
  address: {
    flexGrow: 1,
  },
  copyButton: {
    minWidth: 'unset',

    '&&': {
      padding: theme.spacing(1),
    },
  },
}));

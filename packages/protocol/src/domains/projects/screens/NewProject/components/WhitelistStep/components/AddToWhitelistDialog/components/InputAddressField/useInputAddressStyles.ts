import { makeStyles } from 'tss-react/mui';

export const useInputAddressStyles = makeStyles()(theme => ({
  inputBase: {
    paddingRight: 0,
    borderRadius: 17,
    fontSize: 14,
    height: 44,

    '&&& input': {
      minHeight: 'auto',
      borderRadius: 'unset',
    },

    '& label': { marginBottom: theme.spacing(4), fontWeight: 700 },
  },
  domain: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(7),
  },
}));

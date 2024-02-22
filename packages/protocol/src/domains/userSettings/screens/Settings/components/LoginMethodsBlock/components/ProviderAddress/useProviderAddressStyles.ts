import { makeStyles } from 'tss-react/mui';

export const useProviderAddressStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  nameWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  copyButton: {
    marginLeft: theme.spacing(1),
  },
  copyIcon: {
    color: theme.palette.text.secondary,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));

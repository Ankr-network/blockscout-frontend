import { makeStyles } from 'tss-react/mui';

export const useNetworkItemStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    width: '100%',
  },
  network: {
    display: 'flex',
    alignItems: 'center',
  },
  networkIcon: {
    height: 24,
    width: 24,
    marginRight: theme.spacing(2),
  },
  checkIcon: {
    color: theme.palette.primary.main,
  },
}));

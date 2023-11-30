import { makeStyles } from 'tss-react/mui';

export const useWhitelistStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  counters: {
    marginTop: theme.spacing(4),
  },
}));

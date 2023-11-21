import { makeStyles } from 'tss-react/mui';

export const useWhitelistDetailsStyles = makeStyles()(theme => ({
  title: {
    marginBottom: theme.spacing(3),
  },
  description: {
    marginBottom: theme.spacing(4),
  },
  whitelistItemsCounters: {
    marginBottom: theme.spacing(8),
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

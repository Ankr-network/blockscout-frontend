import { makeStyles } from 'tss-react/mui';

export const useWhitelistItemsCountersStyles = makeStyles()(theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
  },
}));

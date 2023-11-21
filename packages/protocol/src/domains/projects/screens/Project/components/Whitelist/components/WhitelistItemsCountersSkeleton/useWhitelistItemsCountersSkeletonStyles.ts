import { makeStyles } from 'tss-react/mui';

export const useWhitelistItemsCountersSkeletonStyles = makeStyles()(theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: theme.spacing(1),

    marginTop: theme.spacing(4),
  },
  item: {
    width: 140,
    height: 32,

    borderRadius: 12,
  },
}));

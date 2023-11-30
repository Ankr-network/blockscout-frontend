import { makeStyles } from 'tss-react/mui';

export const useRequestsSkeletonStyles = makeStyles()(theme => ({
  root: {
    width: '100%',

    marginTop: theme.spacing(8),

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  left: {
    width: '100%',
  },
  counts: {
    height: 32,
    width: 68,
    borderRadius: 12,
    marginBottom: theme.spacing(1),
  },
  percent: { height: 16, width: 32, borderRadius: 12 },
  chart: {
    width: 180,
    height: 52,
    borderRadius: 12,
    marginRight: theme.spacing(10),
  },
}));

import { makeStyles } from 'tss-react/mui';

export const useTimeframe30DTitleStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
  },
  timeframe: {
    color: theme.palette.grey[600],

    fontWeight: 500,
    fontSize: 12,
    lineHeight: '16px',
  },
}));

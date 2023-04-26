import { makeStyles } from 'tss-react/mui';

export const useRateStyles = makeStyles()(theme => ({
  root: {
    color: theme.palette.grey[600],

    fontWeight: 700,
    fontSize: 16,
    lineHeight: '24px',
  },
  skeleton: {
    width: 187,
    height: 24,

    transform: 'none',
  },
}));

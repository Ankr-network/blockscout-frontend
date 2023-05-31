import { makeStyles } from 'tss-react/mui';

export const useHeadRowStyles = makeStyles()(theme => ({
  cell: {
    paddingBottom: theme.spacing(2),

    color: theme.palette.grey[600],

    fontWeight: 500,
    fontSize: 12,
    lineHeight: '16px',
  },
}));

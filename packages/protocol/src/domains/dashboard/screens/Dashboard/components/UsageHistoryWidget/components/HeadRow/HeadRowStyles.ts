import { makeStyles } from 'tss-react/mui';

export const useHeadRowStyles = makeStyles()(theme => ({
  row: {
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    display: 'flex',
  },
  cell: {
    width: '33%',
    paddingBottom: theme.spacing(1),
    color: theme.palette.grey[600],
    fontWeight: 500,
    fontSize: 12,
    lineHeight: '16px',
  },
}));

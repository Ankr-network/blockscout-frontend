import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

export const useMethodCallsTableStyles = makeStyles()((theme: Theme) => ({
  content: {
    overflow: 'auto',
  },
  table: {
    minWidth: 460,
    [theme.breakpoints.down('xs')]: {
      borderSpacing: theme.spacing(0, 2),
    },
  },
  cell: {
    border: 'none',
    '&:first-of-type': {
      paddingLeft: 0,
    },
    '&:last-of-type': {
      paddingRight: 0,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
      padding: theme.spacing(2),
    },
  },
  th: {
    backgroundColor: 'transparent',
    fontSize: '12px',

    borderRadius: 0,
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(3),

    b: {
      fontSize: 14,
      fontWeight: '400',
    },
  },
  noData: {
    height: theme.spacing(2 * 30),
  },
  progressbar: {
    height: 5,
    backgroundColor: theme.palette.action.disabledBackground,
    minWidth: 8,
    borderRadius: 4,
  },
}));

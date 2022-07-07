import { makeStyles } from '@material-ui/core';

export const useStyle = makeStyles(theme => ({
  root: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    background: theme.palette.background.default,
    padding: theme.spacing(2, 2.5),
    color: theme.palette.grey['500'],
    fontSize: '14px',
    lineHeight: 1.2,
    fontWeight: 400,

    '&:first-of-type': {
      borderRadius: '12px 0 0 12px',
    },

    '&:last-of-type': {
      borderRadius: '0 12px 12px 0',
    },
  },
  thContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  hasCursor: {
    cursor: 'pointer',
  },
  tr: {
    borderBottom: '1px solid #E2E8F3',
  },
  td: {
    padding: theme.spacing(3, 2.5),
  },
  iconArrowRotated: {
    transform: 'rotate(180deg)',
  },
}));

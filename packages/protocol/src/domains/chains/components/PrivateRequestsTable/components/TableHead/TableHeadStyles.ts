import { makeStyles } from 'tss-react/mui';

export const useTableHeadStyles = makeStyles()(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,

    width: '100%',

    borderBottom: `1px solid ${theme.palette.divider}`,

    color: theme.palette.grey[600],
  },
  row: {
    display: 'flex',
    gap: theme.spacing(2.5),

    padding: theme.spacing(2, 7.5),
  },
  cell: {
    fontWeight: 400,
    lineHeight: '16.2px',
    fontSize: 12,

    '&:nth-of-type(1)': {
      width: '20%',
      minWidth: 70,
    },

    '&:nth-of-type(2)': {
      width: '55%',
      minWidth: 108,
    },

    '&:nth-of-type(3)': {
      width: '25%',
    },
  },
}));

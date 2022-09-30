import { makeStyles, Theme } from '@material-ui/core/styles';

const cellBorderRadius = {
  '&:first-child': {
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
  },
  '&:last-child': {
    borderBottomRightRadius: '20px',
    borderTopRightRadius: '20px',
  },
};

export const useClientsTableStyles = makeStyles((theme: Theme) => ({
  table: {
    borderCollapse: 'separate',
    borderSpacing: '0 12px',
  },
  headerCell: {
    backgroundColor: theme.palette.grey['400'],
    ...cellBorderRadius,
  },
  row: {
    backgroundColor: theme.palette.background.paper,
  },
  cell: {
    border: '0',
    ...cellBorderRadius,
  },
  rowClickable: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey['400'],
    },
  },
}));

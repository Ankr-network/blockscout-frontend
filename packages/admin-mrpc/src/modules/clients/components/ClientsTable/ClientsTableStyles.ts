import { Theme } from '@mui/material/styles';

import { makeStyles } from 'tss-react/mui';

const cellBorderRadius = {
  '&:nth-of-type(1)': {
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
  },
  '&:last-child': {
    borderBottomRightRadius: '20px',
    borderTopRightRadius: '20px',
  },
};

export const useClientsTableStyles = makeStyles()((theme: Theme) => ({
  table: {
    borderCollapse: 'separate',
    borderSpacing: '0 12px',
  },
  headerCell: {
    backgroundColor: theme.palette.grey['200'],
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
    transition: 'background-color .3s',
    '&:hover': {
      backgroundColor: theme.palette.grey['100'],
    },
  },
}));

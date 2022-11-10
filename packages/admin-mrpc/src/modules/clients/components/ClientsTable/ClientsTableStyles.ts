import { Theme } from '@mui/material/styles';

import { makeStyles } from 'tss-react/mui';

// :nth-of-type used instead of first-child because of warning:
// The pseudo class ":first-child" is potentially unsafe when doing server-side rendering. Try changing it to ":first-of-type".
const firstChild = '&:nth-of-type(1)';

const cellBorderRadius = {
  [firstChild]: {
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
  },
  '&:last-child': {
    borderBottomRightRadius: '20px',
    borderTopRightRadius: '20px',
  },
};

export const useClientsTableStyles = makeStyles()((theme: Theme) => ({
  tableContainer: {
    backgroundColor: theme.palette.background.default,
  },
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

    [firstChild]: {
      maxWidth: 160,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      ...cellBorderRadius[firstChild],
    },
  },
  rowClickable: {
    cursor: 'pointer',
    transition: 'background-color .3s',
    '&:hover': {
      backgroundColor: theme.palette.grey['100'],
    },
  },
  btnOptions: {
    padding: theme.spacing(1),
    minWidth: 0,
    width: 40,
    height: 40,
    '&:hover': {
      backgroundColor: theme.palette.grey['200'],
    },
  },
}));

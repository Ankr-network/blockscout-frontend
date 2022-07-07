import { alpha, makeStyles } from '@material-ui/core';

interface ITableRowProps {
  count: number;
  customCell?: string;
  expandable?: boolean;
}

export const useTableRowStyles = makeStyles(theme => ({
  row: {
    display: 'block',
    listStyle: 'none',
    margin: 0,
    padding: theme.spacing(1.5, 0),
    borderBottom: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,

    '&:last-of-type': {
      borderBottom: 'none',
    },

    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: ({
        count,
        customCell,
        expandable,
      }: ITableRowProps) => {
        if (expandable)
          return `${customCell} 90px` || `repeat(${count + 1}, 1fr)`;

        return customCell || `repeat(${count}, 1fr)`;
      },
      border: 'none',
      padding: 0,
    },
  },

  rowHovered: {
    position: 'relative',
    textDecoration: 'none',
    '&:hover $cell:first-child::after': {
      height: '100%',
    },
  },

  expandedRow: {
    margin: `${theme.spacing(1, 0, 0)} !important`,
    borderRadius: `${theme.spacing(2.25, 2.25, 0, 0)} !important`,

    [theme.breakpoints.up('md')]: {
      margin: '0 !important',

      '& td': {
        margin: theme.spacing(1, 0, 0, 0),

        '&:first-child': {
          borderRadius: theme.spacing(2.25, 0, 0, 0),
        },

        '&:last-child': {
          borderRadius: theme.spacing(0, 2.25, 0, 0),
        },
      },
    },
  },

  expandedSlot: {
    display: 'grid',
    gridTemplateColumns: '1fr !important',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(0, 0, 2.25, 2.25),

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 0, 1, 0),
    },
  },

  iconWrap: {
    width: 40,
    height: 40,
    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: 12,
    color: theme.palette.text.secondary,
  },

  invertedIcon: {
    transform: 'rotate(180deg)',
  },
}));

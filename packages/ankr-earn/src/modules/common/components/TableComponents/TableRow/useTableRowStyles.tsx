import { alpha, makeStyles } from '@material-ui/core';

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
      display: 'contents',
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
}));

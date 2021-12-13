import { alpha, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useTableRowStyles = makeStyles<Theme>(theme => ({
  row: {
    listStyle: 'none',
    margin: 0,
    padding: theme.spacing(1.5, 0),
    borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,

    [theme.breakpoints.up('sm')]: {
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

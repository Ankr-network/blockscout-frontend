import { makeStyles, Theme } from '@material-ui/core';

export const TABLE_MIN_WIDTH = 808;

export const useTableStyles = makeStyles<
  Theme,
  {
    minWidth?: string | number;
  }
>(theme => ({
  container: {
    padding: theme.spacing(0, 1.5),

    [theme.breakpoints.up('md')]: {
      overflow: 'hidden',
      overflowX: 'auto',
      padding: theme.spacing(1, 2),
    },

    [theme.breakpoints.up('xl')]: {
      overflow: 'visible',
    },
  },

  containerNoPaper: {
    [theme.breakpoints.up('md')]: {
      background: 'none',
      padding: 0,
      borderRadius: 0,
    },
  },

  table: {
    display: 'block',
    position: 'relative',

    [theme.breakpoints.up('md')]: {
      minWidth: props =>
        typeof props.minWidth === 'number' || typeof props.minWidth === 'string'
          ? props.minWidth
          : TABLE_MIN_WIDTH,
      overflow: 'visible',
      height: '100%',
      boxSizing: 'border-box',
    },
  },
}));

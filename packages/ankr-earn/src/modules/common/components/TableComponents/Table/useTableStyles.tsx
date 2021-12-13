import { makeStyles, Theme } from '@material-ui/core';

export const TABLE_MIN_WIDTH = 808;

export const useTableStyles = makeStyles<Theme, { minWidth?: string | number }>(
  theme => ({
    container: {
      [theme.breakpoints.up('sm')]: {
        overflow: 'hidden',
        overflowX: 'auto',
      },

      [theme.breakpoints.up('lg')]: {
        overflow: 'visible',
      },
    },

    table: {
      position: 'relative',

      [theme.breakpoints.up('sm')]: {
        minWidth: props =>
          typeof props.minWidth === 'number' ||
          typeof props.minWidth === 'string'
            ? props.minWidth
            : TABLE_MIN_WIDTH,
        overflow: 'visible',
        height: '100%',
        boxSizing: 'border-box',
      },
    },
  }),
);

import { makeStyles, Theme } from '@material-ui/core';

export const TABLE_MIN_WIDTH = 900;

export const useTableStyles = makeStyles<Theme, { minWidth?: string | number }>(
  theme => ({
    table: {
      position: 'relative',
      minWidth: props =>
        typeof props.minWidth === 'number' || typeof props.minWidth === 'string'
          ? props.minWidth
          : TABLE_MIN_WIDTH,
      overflow: 'visible',
      height: '100%',
      boxSizing: 'border-box',
    },
  }),
);

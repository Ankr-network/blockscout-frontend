import { darken, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useTableHeadStyles = makeStyles<
  Theme,
  {
    count: number;
    customCell?: string;
    paddingCollapse?: boolean;
    dense?: boolean;
  }
>(theme => ({
  head: {
    display: 'none',

    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: ({ customCell, count }) =>
        customCell ? customCell : `repeat(${count}, 1fr)`,
      alignItems: 'stretch',
      boxSizing: 'border-box',
      marginBottom: ({ dense }) => (dense ? -1 : theme.spacing(1)),
    },
  },

  headSticky: {
    [theme.breakpoints.up('md')]: {
      position: 'sticky',
      zIndex: 1,
      top: 0,
      background: theme.palette.background.default,
    },
  },

  headWithBg: {
    borderRadius: 18,
    background: darken(theme.palette.background.default, 0.04),
  },

  row: {
    display: 'contents',
  },
}));

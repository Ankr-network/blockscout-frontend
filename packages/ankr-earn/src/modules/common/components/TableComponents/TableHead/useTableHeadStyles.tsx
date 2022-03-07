import { darken, makeStyles, Theme } from '@material-ui/core';

interface ITableHeadProps {
  count: number;
  customCell?: string;
  paddingCollapse?: boolean;
  dense?: boolean;
}

export const useTableHeadStyles = makeStyles<Theme, ITableHeadProps>(theme => ({
  head: {
    display: 'none',

    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: ({ customCell, count }) =>
        customCell || `repeat(${count}, 1fr)`,
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

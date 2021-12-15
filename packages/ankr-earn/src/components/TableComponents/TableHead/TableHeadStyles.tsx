import { alpha, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useTableHeadStyles = makeStyles<
  Theme,
  {
    count: number;
    customCell?: string;
    paddingCollapse?: boolean;
  }
>(theme => ({
  head: {
    display: 'none',

    [theme.breakpoints.up('sm')]: {
      display: 'grid',
      gridTemplateColumns: props =>
        props.customCell ? props.customCell : `repeat(${props.count}, 1fr)`,
      alignItems: 'stretch',
      boxSizing: 'border-box',
      borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
    },
  },

  headSticky: {
    [theme.breakpoints.up('sm')]: {
      position: 'sticky',
      zIndex: 1,
      top: 0,
      backgroundColor: theme.palette.background.default,
    },
  },

  row: {
    display: 'contents',
  },
}));

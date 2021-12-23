import { Theme } from '@material-ui/core';
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
    display: 'grid',
    gridTemplateColumns: props =>
      props.customCell ? props.customCell : `repeat(${props.count}, 1fr)`,
    alignItems: 'stretch',
    boxSizing: 'border-box',
    background: '#e4e9f0',
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(0, 3, 0, 3),
    height: theme.spacing(8),
  },

  headSticky: {
    position: 'sticky',
    zIndex: 1,
    top: 0,
    backgroundColor: theme.palette.background.default,
  },

  row: {
    display: 'contents',
  },
}));

import { alpha, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useTableRowStyles = makeStyles<
  Theme,
  {
    count: number;
    customCell?: string;
    paddingCollapse?: boolean;
    dense?: boolean;
  }
>(theme => ({
  wrapper: {
    border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
    borderRadius: theme.spacing(3),
    marginTop: theme.spacing(2.5),
    padding: theme.spacing(0, 3, 0, 3),
    width: '100%',
    display: 'grid',
    gridTemplateColumns: props =>
      props.customCell ? props.customCell : `repeat(${props.count}, 1fr)`,
    alignItems: 'stretch',
    backgroundColor: theme.palette.common.white,
  },
  row: {
    listStyle: 'none',
    margin: 0,
    display: 'contents',
    border: 'none',
    padding: 0,
  },

  rowHovered: {
    position: 'relative',
    textDecoration: 'none',
    '&:hover $cell:first-child::after': {
      height: '100%',
    },
  },
}));

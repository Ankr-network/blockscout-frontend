import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useTableBodyStyles = makeStyles<
  Theme,
  {
    count: number;
    customCell?: string;
    paddingCollapse?: boolean;
    dense?: boolean;
  }
>(theme => ({
  bodyWrapper: {
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
  },
}));

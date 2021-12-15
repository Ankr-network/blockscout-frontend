import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useTableBodyStyles = makeStyles<
  Theme,
  {
    count: number;
    customCell?: string;
  }
>(theme => ({
  body: {
    display: 'block',
    width: '100%',

    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: props =>
        props.customCell ? props.customCell : `repeat(${props.count}, 1fr)`,
      alignItems: 'stretch',
    },
  },
}));

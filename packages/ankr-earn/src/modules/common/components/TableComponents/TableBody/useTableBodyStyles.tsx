import { makeStyles } from '@material-ui/core';

interface ITableBodyProps {
  count: number;
  customCell?: string;
}

export const useTableBodyStyles = makeStyles(theme => ({
  body: {
    display: 'block',
    width: '100%',

    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: ({ count, customCell }: ITableBodyProps) =>
        customCell || `repeat(${count}, 1fr)`,
      alignItems: 'stretch',
    },
  },
}));

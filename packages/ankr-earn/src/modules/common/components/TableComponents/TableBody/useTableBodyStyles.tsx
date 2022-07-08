import { makeStyles } from '@material-ui/core';

export const useTableBodyStyles = makeStyles(theme => ({
  body: {
    display: 'block',
    width: '100%',

    [theme.breakpoints.up('md')]: {
      display: 'grid',
      alignItems: 'stretch',
    },
  },
}));

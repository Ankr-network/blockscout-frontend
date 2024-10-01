import { makeStyles } from 'tss-react/mui';

export const useChainsTableStyles = makeStyles()(theme => ({
  root: {
    tableLayout: 'fixed',

    padding: 0,

    backgroundColor: 'transparent',
  },
  cell: {
    height: 80,
    '&&': {
      borderRadius: 0,

      borderColor: theme.palette.divider,

      backgroundColor: 'transparent',

      fontWeight: 400,
    },
    '&:first-of-type': {
      paddingLeft: 0,
    },
    '&:last-of-type': {
      paddingRight: 0,
    },
  },
}));

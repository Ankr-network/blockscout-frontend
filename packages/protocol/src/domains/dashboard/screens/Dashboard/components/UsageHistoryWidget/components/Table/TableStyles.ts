import { makeStyles } from 'tss-react/mui';

export const useTableSyles = makeStyles()(theme => ({
  isHidden: {
    [theme.breakpoints.up('xl')]: {
      display: 'none',
    },

    /* for wide screens */
    '@media screen and (min-height: 900px)': {
      display: 'flex',
    },
  },
}));

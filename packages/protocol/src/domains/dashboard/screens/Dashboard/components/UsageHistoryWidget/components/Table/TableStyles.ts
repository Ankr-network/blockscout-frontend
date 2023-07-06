import { makeStyles } from 'tss-react/mui';

export const useTableSyles = makeStyles()(theme => ({
  isHidden: {
    [theme.breakpoints.up('xl')]: {
      display: 'none',
    },
  },
}));

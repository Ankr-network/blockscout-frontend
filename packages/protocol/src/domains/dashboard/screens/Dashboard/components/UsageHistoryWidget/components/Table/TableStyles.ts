import { makeStyles } from 'tss-react/mui';

export const useTableSyles = makeStyles()(() => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));

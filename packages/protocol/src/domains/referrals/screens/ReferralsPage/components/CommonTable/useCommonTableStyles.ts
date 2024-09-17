import { makeStyles } from 'tss-react/mui';

const name = 'CommonTable';

export const useCommonTableStyles = makeStyles({ name })(() => ({
  root: {
    tableLayout: 'fixed',

    borderCollapse: 'collapse',
    borderSpacing: 0,
  },
}));

import { makeStyles } from 'tss-react/mui';

const name = 'CommonCell';

export const useCommonCellStyles = makeStyles({ name })(theme => ({
  root: {
    height: 37,

    borderBottom: `1px solid ${theme.palette.divider}`,

    '&&': {
      padding: 0,
    },
  },
}));

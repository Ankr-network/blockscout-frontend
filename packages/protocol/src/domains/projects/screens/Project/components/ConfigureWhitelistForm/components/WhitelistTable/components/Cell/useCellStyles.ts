import { makeStyles } from 'tss-react/mui';

export const useCellStyles = makeStyles()(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.grey[100]}`,

    backgroundColor: 'transparent',

    '&&': {
      padding: 0,

      borderRadius: 0,
    },
  },
}));

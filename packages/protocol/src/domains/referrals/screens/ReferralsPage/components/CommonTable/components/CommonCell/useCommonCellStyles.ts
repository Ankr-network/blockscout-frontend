import { makeStyles } from 'tss-react/mui';

const name = 'CommonCell';

export const useCommonCellStyles = makeStyles({ name })(theme => ({
  root: {
    height: 37,

    borderBottom: `1px solid ${theme.palette.divider}`,

    whiteSpace: 'pre-wrap',
    textWrap: 'nowrap',

    '&&': {
      padding: theme.spacing(0, 3.75),

      '&:first-of-type': {
        paddingLeft: 0,
      },

      '&:last-of-type': {
        paddingRight: 0,
      },

      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0, 2),
      },
    },
  },
}));

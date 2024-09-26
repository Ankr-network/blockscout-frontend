import { makeStyles } from 'tss-react/mui';

const name = 'BonusHistoryTable';

export const useBonusHistoryTableStyles = makeStyles({ name })(theme => ({
  root: {
    tableLayout: 'fixed',

    borderCollapse: 'collapse',
    borderSpacing: 0,
  },
  amountCell: {
    color: theme.palette.success.main,

    [theme.breakpoints.down('sm')]: {
      textAlign: 'right',
    },
  },
}));

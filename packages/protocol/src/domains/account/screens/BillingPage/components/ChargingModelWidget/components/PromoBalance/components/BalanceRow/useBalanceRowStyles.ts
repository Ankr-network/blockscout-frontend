import { makeStyles } from 'tss-react/mui';

const name = 'BalanceRow';

export const useBalanceRowStyles = makeStyles({ name })(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(7.5),

    height: 40,

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: theme.spacing(2),

      height: 'auto',
    },
  },
  title: {
    flexBasis: 148,

    color: theme.palette.text.primary,

    [theme.breakpoints.down('xs')]: {
      flexBasis: 'auto',
    },
  },
  balance: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),

    color: theme.palette.text.primary,

    [theme.breakpoints.down('xs')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      columnGap: theme.spacing(2),

      width: '100%',
    },
  },
  requests: {
    color: theme.palette.text.secondary,
  },
}));

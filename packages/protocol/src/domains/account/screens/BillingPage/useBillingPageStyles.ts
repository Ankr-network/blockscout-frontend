import { makeStyles } from 'tss-react/mui';

export const ACCOUNT_MAX_WIDTH = 1340;

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 1230,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  ongoingPayments: {
    marginTop: theme.spacing(10),
  },
  payments: {
    marginTop: theme.spacing(10),

    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(8),
    },
  },
  expenseChart: {
    marginTop: theme.spacing(10.5),

    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
  referralBonusBanner: {
    marginBottom: theme.spacing(5),
  },
}));

import { makeStyles } from 'tss-react/mui';

import { CONTENT_WIDTH } from 'modules/layout/components/DefautLayout';

export const ACCOUNT_MAX_WIDTH = 1340;

export const useStyles = makeStyles<boolean>()((theme, hasSubscriptions) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: CONTENT_WIDTH,
    marginLeft: 'auto',
    marginRight: 'auto',

    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(7),
    },
  },
  top: {
    display: 'grid',
    gridTemplateColumns: '1fr 600px',
    gridTemplateRows: '1fr',
    gridTemplateAreas: hasSubscriptions
      ? `
          "balance       top-up"
          "subscriptions top-up"
        `
      : `
          "balance top-up"
          "balance top-up"
        `,
    gap: theme.spacing(7.5),

    height: 490,

    [`@media (max-width:${ACCOUNT_MAX_WIDTH}px)`]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: hasSubscriptions ? '220px auto 490px' : '220px 490px',
      gridTemplateAreas: hasSubscriptions
        ? `
            "balance"
            "subscriptions"
            "top-up"
          `
        : `
            "balance"
            "top-up"
          `,

      height: 'unset',
    },
  },
  topUp: {
    gridArea: 'top-up',
    background: theme.palette.background.paper,
  },
  balance: {
    gridArea: 'balance',
  },
  subscriptions: {
    gridArea: 'subscriptions',
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
}));

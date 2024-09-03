import { makeStyles } from 'tss-react/mui';

export const ACCOUNT_GRID_MAX_WIDTH = 1400;

export const useAccountManagerStyles = makeStyles()(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
    gridTemplateRows: 'repeat(2, minmax(214px, auto))',
    gridTemplateAreas: `
      "balance       payment-form"
      "subscriptions payment-form"
    `,

    columnGap: theme.spacing(7.5),
    rowGap: theme.spacing(5),

    [theme.breakpoints.down(ACCOUNT_GRID_MAX_WIDTH)]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'repeat(2, minmax(214px, auto)) minmax(490px, auto)',
      gridTemplateAreas: `
        "balance"
        "subscriptions"
        "payment-form"
      `,
    },
  },
  balance: {
    gridArea: 'balance',

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(5.5, 4),
    },
  },
  subscriptions: {
    gridArea: 'subscriptions',

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(5.5, 4),
    },
  },
  paymentForm: {
    gridArea: 'payment-form',

    background: theme.palette.background.paper,
    padding: theme.spacing(6, 8),

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(5.5, 4),
    },
  },
  currentPlan: {
    gridArea: 'current-plan',
  },
}));

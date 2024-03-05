import { makeStyles } from 'tss-react/mui';

const MAX_WIDTH = 1428;

export const useAccountManagerStyles = makeStyles()(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0,1fr) 600px',
    gridTemplateRows: 'repeat(2, 230px)',
    gridTemplateAreas: `
      "balance       top-up"
      "subscriptions top-up"
    `,

    columnGap: theme.spacing(7.5),
    rowGap: theme.spacing(5),

    [theme.breakpoints.down(MAX_WIDTH)]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'repeat(2, minmax(230px, auto)) minmax(490px, auto)',
      gridTemplateAreas: `
        "balance"
        "subscriptions"
        "top-up"
      `,
    },
  },
  balance: {
    gridArea: 'balance',
  },
  subscriptions: {
    gridArea: 'subscriptions',
  },
  topUp: {
    gridArea: 'top-up',

    background: theme.palette.background.paper,
    padding: theme.spacing(7.5),

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(6),
    },
  },
  currentPlan: {
    gridArea: 'current-plan',
  },
}));

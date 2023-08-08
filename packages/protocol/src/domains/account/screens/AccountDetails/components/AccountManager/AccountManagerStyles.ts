import { makeStyles } from 'tss-react/mui';

const MAX_WIDTH = 1428;
const MAX_WIDTH_WITH_CURRENT_PLAN = 1320;

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
  },
  currentPlan: {
    gridArea: 'current-plan',
  },

  withCurrentPlan: {
    gridTemplateColumns: 'minmax(0,1fr) 1fr',
    gridTemplateRows: '244px',
    gridTemplateAreas: `
      "balance current-plan"
    `,

    [theme.breakpoints.down(MAX_WIDTH_WITH_CURRENT_PLAN)]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'repeat(2, minmax(244px, auto))',
      gridTemplateAreas: `
        "balance"
        "current-plan"
      `,
    },
  },
}));

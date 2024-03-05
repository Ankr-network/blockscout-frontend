import { makeStyles } from 'tss-react/mui';

type NestedSelectors = 'header' | 'balance' | 'description';

export const useChargingModelWidgetStyles = makeStyles<void, NestedSelectors>()(
  (theme, _params, classes) => ({
    root: {
      padding: theme.spacing(7, 8, 8),
    },
    content: {},
    header: {
      marginBottom: theme.spacing(10),

      [theme.breakpoints.down('xs')]: {
        '&&&': {
          marginBottom: theme.spacing(8),
        },
      },
    },
    balance: {
      [theme.breakpoints.down('xs')]: {
        '&&&': {
          marginBottom: theme.spacing(8),
        },
      },
    },
    description: {},
    withDescription: {},
    withPAYGLabel: {
      [`& .${classes.header}`]: {
        marginBottom: theme.spacing(9),
      },
    },
    widgetActions: {
      right: 194,
    },
    balanceProgressBar: {
      marginTop: theme.spacing(3),
    },
  }),
);

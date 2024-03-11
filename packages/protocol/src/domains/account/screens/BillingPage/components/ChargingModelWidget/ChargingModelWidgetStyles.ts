import { makeStyles } from 'tss-react/mui';

type NestedSelectors = 'header' | 'balance' | 'description';

export const useChargingModelWidgetStyles = makeStyles<void, NestedSelectors>()(
  (theme, _params, classes) => ({
    root: {},
    content: {},
    header: {
      marginBottom: theme.spacing(10),

      [theme.breakpoints.down('xs')]: {
        '&&&': {
          marginBottom: theme.spacing(8),
        },
      },
    },
    balance: {},
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

    assetsBtn: {
      marginLeft: 'auto',
      whiteSpace: 'nowrap',

      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(4),
        width: '100%',
      },
    },
  }),
);

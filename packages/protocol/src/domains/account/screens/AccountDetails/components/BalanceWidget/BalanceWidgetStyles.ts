import { makeStyles } from 'tss-react/mui';

type NestedSelectors =
  | 'header'
  | 'balance'
  | 'description'
  | 'withSubscription';

export const useBalanceWidgetStyles = makeStyles<void, NestedSelectors>()(
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
    withDescription: {
      [`& .${classes.balance}`]: {
        marginBottom: theme.spacing(5.5),
      },

      [`&.${classes.withSubscription}`]: {
        [`& .${classes.balance}`]: {
          marginBottom: theme.spacing(3),
        },

        [`& .${classes.description}`]: {
          marginBottom: theme.spacing(4.5),
        },
      },

      [theme.breakpoints.down('xs')]: {
        [`&.${classes.withSubscription}`]: {
          [`& .${classes.balance}`]: {
            marginBottom: theme.spacing(4),
          },

          [`& .${classes.description}`]: {
            marginBottom: theme.spacing(8),
          },
        },
      },
    },
    withSubscription: {
      [`& .${classes.balance}`]: {
        marginBottom: theme.spacing(10.5),
      },
    },
    withPAYGLabel: {
      [`& .${classes.header}`]: {
        marginBottom: theme.spacing(9),
      },
    },
  }),
);

import { makeStyles, Theme } from '@material-ui/core/styles';

export const useUSDSubscriptionPricesTabsStyles = makeStyles<Theme, boolean>(
  theme => ({
    root: {
      borderRadius: theme.spacing(1.5),

      background: theme.palette.background.default,

      border: hasTabs =>
        hasTabs ? `2px solid ${theme.palette.background.default}` : '',
      marginBottom: hasTabs => (hasTabs ? theme.spacing(1.5) : '0'),

      '& > div': {
        width: '100%',

        '& > div': {
          width: '100%',
        },

        '& button': {
          padding: theme.spacing(0.75),
        },
      },
    },
    skeleton: {
      height: 32,
      transform: 'none',
      marginBottom: theme.spacing(1.5),
      borderRadius: theme.spacing(1.25),
    },
  }),
);

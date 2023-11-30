import { makeStyles } from 'tss-react/mui';

import { ACCOUNT_MAX_WIDTH } from 'domains/account/screens/AccountDetails/AccountDetailsStyles';

export const useUSDSubscriptionPricesTabsStyles = makeStyles<boolean>()(
  (theme, hasTabs) => ({
    root: {
      borderRadius: 17,

      background: theme.palette.background.default,

      border: hasTabs ? `2px solid ${theme.palette.background.default}` : '',
      marginBottom: hasTabs ? theme.spacing(3) : '0',

      '& div': {
        width: '100%',
      },

      '& > div': {
        '& button': {
          padding: theme.spacing(1.5),

          [`@media (max-width:${ACCOUNT_MAX_WIDTH}px)`]: {
            padding: theme.spacing(1.5),
            marginRight: 0,
          },
        },
      },
    },
    skeleton: {
      height: theme.spacing(12),
      transform: 'none',
      marginBottom: theme.spacing(3),
      borderRadius: theme.spacing(2.5),
    },
  }),
);

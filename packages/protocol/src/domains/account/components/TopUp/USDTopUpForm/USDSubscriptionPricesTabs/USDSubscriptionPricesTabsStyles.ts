import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { ACCOUNT_MAX_WIDTH } from 'domains/account/screens/AccountDetails/AccountDetailsStyles';

export const useUSDSubscriptionPricesTabsStyles = makeStyles<boolean>()(
  (theme: Theme, hasTabs: boolean) => ({
    root: {
      borderRadius: theme.spacing(2 * 1.5),

      background: theme.palette.background.default,

      border: hasTabs ? `2px solid ${theme.palette.background.default}` : '',
      marginBottom: hasTabs ? theme.spacing(2 * 1.5) : '0',

      '& > div': {
        width: '100%',

        '& > div': {
          width: '100%',
        },

        '& button': {
          padding: theme.spacing(2 * 0.75),

          [`@media (max-width:${ACCOUNT_MAX_WIDTH}px)`]: {
            padding: theme.spacing(2 * 0.75, 0),
            marginRight: 0,
          },
        },
      },
    },
    skeleton: {
      height: 32,
      transform: 'none',
      marginBottom: theme.spacing(2 * 1.5),
      borderRadius: theme.spacing(2 * 1.25),
    },
  }),
);

import { makeStyles } from 'tss-react/mui';

import { ACCOUNT_MAX_WIDTH } from 'domains/account/screens/BillingPage/useBillingPageStyles';

export const usePriceTabsStyles = makeStyles<boolean>()((theme, hasTabs) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',

    borderRadius: 17,

    background: theme.palette.background.default,

    border: hasTabs ? `2px solid ${theme.palette.background.default}` : '',
    marginBottom: hasTabs ? theme.spacing(3) : '0',

    '& > div': {
      width: '100%',

      '& > div': {
        width: '100%',
      },

      '& button': {
        padding: theme.spacing(1.5),

        [`@media (max-width:${ACCOUNT_MAX_WIDTH}px)`]: {
          padding: theme.spacing(1.5, 0),
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
}));

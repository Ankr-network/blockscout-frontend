import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { ACCOUNT_MAX_WIDTH } from 'domains/account/screens/AccountDetails/AccountDetailsStyles';

export const useStyles = makeStyles()((theme: Theme) => ({
  rootForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  pricesTabsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flex: 1,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1.5,
    justifyContent: 'space-between',

    [theme.breakpoints.down('sm')]: {
      gap: 6,
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'unset',
    },
  },
  amount: {
    flex: 1,
    [`@media (max-width:${ACCOUNT_MAX_WIDTH}px)`]: {
      marginBottom: 'unset',
    },
  },
}));

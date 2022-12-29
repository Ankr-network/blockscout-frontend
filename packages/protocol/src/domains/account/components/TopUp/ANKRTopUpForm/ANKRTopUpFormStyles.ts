import { makeStyles, Theme } from '@material-ui/core';
import { ACCOUNT_MAX_WIDTH } from 'domains/account/screens/AccountDetails/AccountDetailsStyles';

export const useStyles = makeStyles<Theme>(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      gap: 6,
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'unset',
      justifyContent: 'unset',
      height: 'unset',
    },
  },
  amount: {
    paddingTop: 30,
    marginTop: 'auto',
    marginBottom: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginTop: 'unset',
      marginBottom: 'unset',
    },
    [`@media (max-width:${ACCOUNT_MAX_WIDTH}px)`]: {
      paddingTop: 'unset',
    },
  },
  button: {
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      maxWidth: 86,
    },

    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
}));

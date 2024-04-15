import { dialogTitleClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useCryptoPaymentSuccessDialogStyles = makeStyles()(theme => ({
  paper: {
    width: 600,

    borderRadius: 40,

    [`.${dialogTitleClasses.root}`]: {
      justifyContent: 'center',
      alignItems: 'flex-start',

      marginBottom: theme.spacing(4),
    },
  },
  header: {
    marginBottom: theme.spacing(8),
  },
  addressDetails: {
    marginBottom: theme.spacing(5),
  },
}));

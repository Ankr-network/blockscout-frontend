import { dialogTitleClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useCryptoPaymentSummaryDialogStyles = makeStyles()(theme => ({
  paper: {
    width: 600,

    borderRadius: 40,
    [`.${dialogTitleClasses.root}`]: {
      marginBottom: theme.spacing(6),
    },
  },
  txDetails: {
    marginBottom: theme.spacing(8),
  },
}));

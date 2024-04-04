import { dialogTitleClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useSwitchAccountDialogStyles = makeStyles()(theme => ({
  paper: {
    width: 600,

    [`.${dialogTitleClasses.root}`]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  description: {
    marginBottom: theme.spacing(3),

    textAlign: 'center',

    color: theme.palette.text.secondary,
  },
  walletAddress: {
    marginBottom: theme.spacing(8),
  },
}));

import { dialogContentClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useLinkExpiredDialogStyles = makeStyles()(theme => ({
  dialogPaper: {
    width: 600,

    [`.${dialogContentClasses.root}`]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  description: {
    marginBottom: theme.spacing(8),
  },
}));

import { dialogTitleClasses, iconButtonClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const name = 'NotificationDialog';

export const useNotificationDialogStyles = makeStyles({ name })(theme => ({
  paper: {
    width: 600,

    [`.${dialogTitleClasses.root}`]: {
      position: 'static',

      marginBottom: theme.spacing(6),
    },

    [`.${iconButtonClasses.root}`]: {
      top: 20,
      right: 20,
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5),
  },
}));

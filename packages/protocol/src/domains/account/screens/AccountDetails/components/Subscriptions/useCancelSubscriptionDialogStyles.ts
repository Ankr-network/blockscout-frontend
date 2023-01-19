import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useCancelSubscriptionDialogStyles = makeStyles()(
  (theme: Theme) => ({
    dialogTitle: {
      '& h2': {
        display: 'flex',
        alignItems: 'center',
        fontSize: 35,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2 * 3.5),
    },
    text: {
      fontWeight: 400,
    },
    buttons: {
      display: 'flex',
      gap: theme.spacing(2 * 1.5),
    },
  }),
);

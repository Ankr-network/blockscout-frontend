import { Theme, makeStyles } from '@material-ui/core';

export const useCancelSubscriptionDialogStyles = makeStyles<Theme>(theme => ({
  root: {},
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
    gap: theme.spacing(3.5),
  },
  text: {
    fontWeight: 400,
  },
  buttons: {
    display: 'flex',
    gap: theme.spacing(1.5),
  },
}));

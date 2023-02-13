import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useConfirmReminderDialogStyles = makeStyles()((theme: Theme) => ({
  dialog: {
    marginTop: theme.spacing(-16),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(-10),
    },
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(7.5),
  },
  message: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: '28px',
    fontWeight: 400,
    padding: theme.spacing(0, 4),
  },

  button: {
    fontSize: 20,
    lineHeight: '28px',
    fontWeight: 700,
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: 'transparent',
    },
  },
}));

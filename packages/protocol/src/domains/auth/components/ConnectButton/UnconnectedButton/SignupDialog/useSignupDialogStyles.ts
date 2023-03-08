import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useSignupDialogStyles = makeStyles()((theme: Theme) => ({
  button: {
    color: theme.palette.text.primary,
    marginTop: theme.spacing(5),
    '&+&': {
      marginBottom: theme.spacing(10),
    },
  },
  subtitle: {
    display: 'block',
    textAlign: 'center',

    '& a': {
      fontWeight: 500,
      color: theme.palette.text.primary,
    },
  },
  dialogTitle: {
    fontSize: theme.typography.fontSize * 2,
    paddingRight: theme.spacing(13),
    display: 'flex',
    alignItems: 'flex-end',
  },
  closeButton: {
    alignSelf: 'flex-start',
  },
}));

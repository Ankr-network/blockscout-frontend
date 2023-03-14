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
    fontSize: theme.typography.fontSize,
    color: theme.palette.grey[700],
    fontWeight: 400,

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
  paperRoot: {
    width: '100%',
  },
}));

import { makeStyles } from 'tss-react/mui';

export const useTwoFAInputStyles = makeStyles()(theme => ({
  description: {
    marginBottom: theme.spacing(7),
    display: 'block',
  },
  button: {
    marginTop: theme.spacing(7),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(8),
  },
  messageText: {
    marginLeft: theme.spacing(2.5),
  },
}));

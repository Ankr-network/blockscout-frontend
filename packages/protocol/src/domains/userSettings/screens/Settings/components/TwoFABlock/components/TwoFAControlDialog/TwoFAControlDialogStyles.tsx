import { makeStyles } from 'tss-react/mui';

export const useTwoFAControlDialogContentStyles = makeStyles()(theme => ({
  description: {
    marginBottom: theme.spacing(7.5),
  },
  button: {
    marginBottom: theme.spacing(6.5),
  },
  title: {
    display: 'inline-block',
    paddingRight: theme.spacing(10),
  },
}));

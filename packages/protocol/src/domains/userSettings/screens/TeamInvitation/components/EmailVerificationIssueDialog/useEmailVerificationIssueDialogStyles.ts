import { makeStyles } from 'tss-react/mui';

export const useEmailVerificationIssueDialogStyles = makeStyles()(theme => ({
  dialogPaper: {
    width: 600,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  description: {
    marginBottom: theme.spacing(8),
  },
}));

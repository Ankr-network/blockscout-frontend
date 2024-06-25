import { makeStyles } from 'tss-react/mui';

export const useConfirmCancellationDialogStyles = makeStyles()(theme => ({
  dialogPaper: {
    backgroundImage: 'none',
    padding: theme.spacing(10),
    textAlign: 'center',
    width: 550,
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  description: {
    marginBottom: theme.spacing(5),
  },
  btn: {
    marginTop: theme.spacing(3),
  },
}));
